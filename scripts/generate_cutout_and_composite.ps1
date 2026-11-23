Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\acer\Desktop\DSAlab\public\images\dsa-hero-visual.png"
$bgPath = "C:\Users\acer\Desktop\DSAlab\public\images\syllabus-hero-bg.jpg"
$outPngPath = "C:\Users\acer\Desktop\DSAlab\public\images\dsa-3d-objects.png"
$outCompositePath = "C:\Users\acer\Desktop\DSAlab\public\images\dsa-hero-composite.png"

$src = [System.Drawing.Bitmap]::FromFile($srcPath)
$bg = [System.Drawing.Bitmap]::FromFile($bgPath)
$w = [int]$src.Width
$h = [int]$src.Height

# 2D array: 0 = unvisited/foreground, 1 = background
$isBg = New-Object 'int[,]' $w, $h
$queue = New-Object System.Collections.Generic.Queue[System.Drawing.Point]

# Enqueue boundary pixels
for ($x = 0; $x -lt $w; $x++) {
    $queue.Enqueue((New-Object System.Drawing.Point($x, 0)))
    $queue.Enqueue((New-Object System.Drawing.Point($x, ($h - 1))))
    $isBg[$x, 0] = 1
    $isBg[$x, ($h - 1)] = 1
}
for ($y = 0; $y -lt $h; $y++) {
    $queue.Enqueue((New-Object System.Drawing.Point(0, $y)))
    $queue.Enqueue((New-Object System.Drawing.Point(($w - 1), $y)))
    $isBg[0, $y] = 1
    $isBg[($w - 1), $y] = 1
}

# Flood fill to find all connected background pixels
while ($queue.Count -gt 0) {
    $pt = $queue.Dequeue()
    $cx = $pt.X
    $cy = $pt.Y
    
    $dxs = @(1, -1, 0, 0)
    $dys = @(0, 0, 1, -1)
    
    for ($i = 0; $i -lt 4; $i++) {
        $nx = $cx + $dxs[$i]
        $ny = $cy + $dys[$i]
        
        if ($nx -ge 0 -and $nx -lt $w -and $ny -ge 0 -and $ny -lt $h) {
            if ($isBg[$nx, $ny] -eq 0) {
                $c = $src.GetPixel($nx, $ny)
                $r = [int]$c.R
                $g = [int]$c.G
                $b = [int]$c.B
                
                # Check background criteria
                $isLight = ($r -gt 195 -and $g -gt 195 -and $b -gt 190)
                $isNeutral = ([Math]::Abs($r - $g) -lt 16 -and [Math]::Abs($b - $g) -lt 18 -and ($g - $r) -lt 14)
                
                if ($isLight -and $isNeutral) {
                    $isBg[$nx, $ny] = 1
                    $queue.Enqueue((New-Object System.Drawing.Point($nx, $ny)))
                }
            }
        }
    }
}

# Now create cutout with smooth edge anti-aliasing
$cutout = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

$minX = $w; $maxX = 0; $minY = $h; $maxY = 0

for ($y = 0; $y -lt $h; $y++) {
    for ($x = 0; $x -lt $w; $x++) {
        if ($isBg[$x, $y] -eq 1) {
            # Background pixel -> pure transparent
            $cutout.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
        } else {
            # Check if this foreground pixel is adjacent to any background pixel (edge pixel)
            $bgNeighbors = 0
            for ($dy = -1; $dy -le 1; $dy++) {
                for ($dx = -1; $dx -le 1; $dx++) {
                    $nx = $x + $dx
                    $ny = $y + $dy
                    if ($nx -ge 0 -and $nx -lt $w -and $ny -ge 0 -and $ny -lt $h) {
                        if ($isBg[$nx, $ny] -eq 1) { $bgNeighbors++ }
                    }
                }
            }
            
            $c = $src.GetPixel($x, $y)
            $r = [int]$c.R
            $g = [int]$c.G
            $b = [int]$c.B
            
            # Anti-aliasing alpha based on neighborhood
            $alpha = 255
            if ($bgNeighbors -ge 4) {
                $alpha = 140
            } elseif ($bgNeighbors -ge 2) {
                $alpha = 195
            } elseif ($bgNeighbors -ge 1) {
                $alpha = 230
            }
            
            # Defringe edge: remove slight background tint
            if ($alpha -lt 255) {
                # Pull color slightly toward emerald green on edges
                if ($g -gt 60) {
                    $r = [Math]::Max(0, [int]($r * 0.92))
                    $b = [Math]::Max(0, [int]($b * 0.92))
                }
            }
            
            $cutout.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, $r, $g, $b))
            
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

Write-Host "Solid Objects Bounding Box: X=$minX..$maxX, Y=$minY..$maxY"

# Crop tightly around the 3D objects with a small margin
$pad = 4
$cropX = [Math]::Max(0, $minX - $pad)
$cropY = [Math]::Max(0, $minY - $pad)
$cropW = [Math]::Min($w - $cropX, ($maxX - $minX) + ($pad * 2))
$cropH = [Math]::Min($h - $cropY, ($maxY - $minY) + ($pad * 2))

$cropRect = New-Object System.Drawing.Rectangle($cropX, $cropY, $cropW, $cropH)
$cropped = $cutout.Clone($cropRect, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

# Save the isolated transparent 3D objects
$cropped.Save($outPngPath, [System.Drawing.Imaging.ImageFormat]::Png)
Write-Host "Saved isolated 3D objects to $outPngPath ($cropW x $cropH)"

# =========================================================================
# COMPOSITE DIRECTLY OVER IMAGE 2 ($bg)
# =========================================================================
$composite = New-Object System.Drawing.Bitmap($bg.Width, $bg.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($composite)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

# Draw the new abstract emerald environment (Image 2)
$g.DrawImage($bg, 0, 0, $bg.Width, $bg.Height)

# Position the extracted 3D objects hovering naturally above the reflective floor ripples:
# The ripples in $bg are centered around X: ~460, Y: ~480
# Scale the 3D objects nicely to width = 450
$targetW = 450
$targetH = [int]($cropped.Height * ($targetW / [double]$cropped.Width))
$targetX = [int](($bg.Width - $targetW) / 2) + 20
$targetY = [int]($bg.Height * 0.36)

# Contact shadow on the reflective floor
$shadowBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(60, 6, 61, 46))
$g.FillEllipse($shadowBrush, $targetX + 50, $targetY + $targetH - 15, $targetW - 100, 22)
$shadowBrush.Dispose()

# Soft emerald ambient reflection
$glowBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(45, 168, 230, 207))
$g.FillEllipse($glowBrush, $targetX + 30, $targetY + $targetH - 20, $targetW - 60, 30)
$glowBrush.Dispose()

# Draw the 3D objects
$g.DrawImage($cropped, $targetX, $targetY, $targetW, $targetH)

$g.Dispose()

$composite.Save($outCompositePath, [System.Drawing.Imaging.ImageFormat]::Png)
Write-Host "Saved combined composite to $outCompositePath ($($bg.Width) x $($bg.Height))"

$src.Dispose()
$bg.Dispose()
$cutout.Dispose()
$cropped.Dispose()
$composite.Dispose()
