Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\acer\Desktop\DSAlab\public\images\dsa-hero-visual.png"
$bgPath = "C:\Users\acer\Desktop\DSAlab\public\images\syllabus-hero-bg.jpg"
$outPngPath = "C:\Users\acer\Desktop\DSAlab\public\images\dsa-3d-objects.png"
$outCompositePath = "C:\Users\acer\Desktop\DSAlab\public\images\dsa-hero-composite.png"

$src = [System.Drawing.Bitmap]::FromFile($srcPath)
$bg = [System.Drawing.Bitmap]::FromFile($bgPath)

$w = $src.Width
$h = $src.Height

Write-Host "Source: $w x $h"

# Create a 32-bit ARGB bitmap for the transparent extracted objects
$cutout = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

# Background color model:
# The background in dsa-hero-visual.png is light grey-cream:
# Top-left is around (226, 229, 222), bottom is around (244, 243, 239)
# We can estimate background color at (x, y) via bilinear or gradient interpolation:
function Get-BgColor($x, $y, $w, $h) {
    $u = $x / [double]$w
    $v = $y / [double]$h
    # Top: ~232, 234, 228
    # Bottom: ~245, 244, 240
    $rBg = 230 + ($v * 15)
    $gBg = 233 + ($v * 11)
    $bBg = 227 + ($v * 13)
    return @($rBg, $gBg, $bBg)
}

# First pass: calculate alpha for every pixel
for ($y = 0; $y -lt $h; $y++) {
    for ($x = 0; $x -lt $w; $x++) {
        $c = $src.GetPixel($x, $y)
        $r = [double]$c.R
        $g = [double]$c.G
        $b = [double]$c.B
        
        $bgC = Get-BgColor $x $y $w $h
        $rBg = $bgC[0]
        $gBg = $bgC[1]
        $bBg = $bgC[2]
        
        # Color difference from local background
        $dr = $r - $rBg
        $dg = $g - $gBg
        $db = $b - $bBg
        $dist = [Math]::Sqrt($dr*$dr + $dg*$dg + $db*$db)
        
        # Green hue dominance: emerald objects have g > r and g > b or green tint
        $greenDominance = [Math]::Max(0.0, ($g - [Math]::Max($r, $b)))
        
        # Darkness / shadow / node darkness (luminance drop compared to background)
        $lum = 0.299 * $r + 0.587 * $g + 0.114 * $b
        $lumBg = 0.299 * $rBg + 0.587 * $gBg + 0.114 * $bBg
        $lumDrop = [Math]::Max(0.0, ($lumBg - $lum))
        
        # Foreground score:
        # If green is dominant, or if luminance is significantly lower, or color distance is high
        $fgScore = ($dist * 1.5) + ($greenDominance * 3.5) + ($lumDrop * 1.8)
        
        # Smooth alpha mapping:
        # Threshold: below 22 is pure background, above 42 is full opacity
        $alpha = 0
        if ($fgScore -le 22.0) {
            $alpha = 0
        } elseif ($fgScore -ge 48.0) {
            $alpha = 255
        } else {
            $t = ($fgScore - 22.0) / (48.0 - 22.0)
            # Smoothstep
            $t = $t * $t * (3.0 - 2.0 * $t)
            $alpha = [int]($t * 255.0)
        }
        
        # Clean edge: if alpha > 0, decontaminate (defringe) background tint
        if ($alpha -gt 0) {
            $aNorm = $alpha / 255.0
            # If semi-transparent, pull color away from background toward emerald
            $outR = [Math]::Min(255, [Math]::Max(0, [int](($r - (1.0 - $aNorm) * $rBg) / [Math]::Max(0.2, $aNorm))))
            $outG = [Math]::Min(255, [Math]::Max(0, [int](($g - (1.0 - $aNorm) * $gBg) / [Math]::Max(0.2, $aNorm))))
            $outB = [Math]::Min(255, [Math]::Max(0, [int](($b - (1.0 - $aNorm) * $bBg) / [Math]::Max(0.2, $aNorm))))
            
            # Ensure emerald richness on semi-transparent edge
            if ($outG -lt $outR -and $outG -gt 50) { $outR = [int]($outR * 0.95) }
            
            $cutout.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, $outR, $outG, $outB))
        } else {
            $cutout.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
        }
    }
}

# Remove stray isolated pixels near borders (margin 8px)
for ($y = 0; $y -lt $h; $y++) {
    for ($x = 0; $x -lt $w; $x++) {
        if ($x -lt 15 -or $x -gt ($w - 12) -or $y -lt 10 -or $y -gt ($h - 10)) {
            $c = $cutout.GetPixel($x, $y)
            if ($c.A -lt 180) {
                $cutout.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
            }
        }
    }
}

# Find tight bounding box of cutout
$minX = $w; $maxX = 0; $minY = $h; $maxY = 0
for ($y = 0; $y -lt $h; $y++) {
    for ($x = 0; $x -lt $w; $x++) {
        $a = $cutout.GetPixel($x, $y).A
        if ($a -gt 15) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

Write-Host "Cutout Bounding Box: X=$minX..$maxX, Y=$minY..$maxY"
$pad = 6
$cropX = [Math]::Max(0, $minX - $pad)
$cropY = [Math]::Max(0, $minY - $pad)
$cropW = [Math]::Min($w - $cropX, ($maxX - $minX) + ($pad * 2))
$cropH = [Math]::Min($h - $cropY, ($maxY - $minY) + ($pad * 2))

$cropRect = New-Object System.Drawing.Rectangle($cropX, $cropY, $cropW, $cropH)
$croppedCutout = $cutout.Clone($cropRect, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

# Save the isolated transparent PNG
$croppedCutout.Save($outPngPath, [System.Drawing.Imaging.ImageFormat]::Png)
Write-Host "Saved transparent PNG: $outPngPath ($cropW x $cropH)"

# =========================================================================
# STEP 2: COMPOSITING ONTO BACKGROUND IMAGE 2
# =========================================================================
# Background image is $bg (1024 x 572)
# Create a high-res composite bitmap
$composite = New-Object System.Drawing.Bitmap($bg.Width, $bg.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($composite)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

# 1. Draw the full background
$g.DrawImage($bg, 0, 0, $bg.Width, $bg.Height)

# 2. Position the extracted 3D objects over the reflective floor ripples:
# The floor ripples in $bg are centered around X: 340 to 680, Y: 430 to 540
# Let's scale the 3D objects to ~460px wide, and place them floating just above the ripples!
$targetW = 460
$targetH = [int]($croppedCutout.Height * ($targetW / [double]$croppedCutout.Width))
$targetX = [int](($bg.Width - $targetW) / 2) + 30   # slightly towards right to balance with ribbon
$targetY = [int]($bg.Height * 0.38)                # floating gracefully above the floor

Write-Host "Placing 3D objects at X=$targetX, Y=$targetY, W=$targetW, H=$targetH"

# 3. Add soft contact shadow & emerald ambient occlusion underneath the floating objects
$shadowBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(55, 6, 61, 46))
$g.FillEllipse($shadowBrush, $targetX + 60, $targetY + $targetH - 18, $targetW - 120, 24)
$shadowBrush.Dispose()

# Ambient emerald glow ring
$glowBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(40, 168, 230, 207))
$g.FillEllipse($glowBrush, $targetX + 40, $targetY + $targetH - 22, $targetW - 80, 30)
$glowBrush.Dispose()

# 4. Draw the 3D objects onto the composite
$g.DrawImage($croppedCutout, $targetX, $targetY, $targetW, $targetH)

$g.Dispose()

# Save the final high-quality composite
$composite.Save($outCompositePath, [System.Drawing.Imaging.ImageFormat]::Png)
Write-Host "Saved composite: $outCompositePath ($($bg.Width) x $($bg.Height))"

$src.Dispose()
$bg.Dispose()
$cutout.Dispose()
$croppedCutout.Dispose()
$composite.Dispose()
