Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\acer\Desktop\DSAlab\public\images\dsa-hero-visual.png"
$src = [System.Drawing.Bitmap]::FromFile($srcPath)
$w = [int]$src.Width
$h = [int]$src.Height

Write-Host "Image dimensions: $w x $h"

# 2D array: 0 = unvisited, 1 = background
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
                
                # Background in the source image is light cream-grey (r>190, g>195, b>185, neutral tint)
                # Emerald 3D structures have strong green or dark nodes or saturated colors
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

$bgCount = 0
$fgCount = 0
for ($y = 0; $y -lt $h; $y++) {
    for ($x = 0; $x -lt $w; $x++) {
        if ($isBg[$x, $y] -eq 1) { $bgCount++ } else { $fgCount++ }
    }
}

Write-Host "Success! Background: $bgCount, Foreground: $fgCount"

$src.Dispose()
