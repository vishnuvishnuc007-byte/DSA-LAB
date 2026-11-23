Add-Type -AssemblyName System.Drawing

$p = "C:\Users\acer\Desktop\DSAlab\public\images\dsa-hero-visual.png"
$src = [System.Drawing.Bitmap]::FromFile($p)

$w = $src.Width
$h = $src.Height

Write-Host "Analyzing $w x $h..."

$minX = $w; $maxX = 0; $minY = $h; $maxY = 0

# Count non-background pixels
$objCount = 0

for ($y = 0; $y -lt $h; $y++) {
    for ($x = 0; $x -lt $w; $x++) {
        $c = $src.GetPixel($x, $y)
        $r = [int]$c.R
        $g = [int]$c.G
        $b = [int]$c.B
        
        # Test background condition:
        # Background is nearly neutral and bright:
        # e.g. r > 215, g > 215, b > 210 and abs(r-g) < 15 and abs(b-g) < 18
        $isBg = ($r -gt 210 -and $g -gt 210 -and $b -gt 205 -and [Math]::Abs($r - $g) -lt 14 -and [Math]::Abs($b - $g) -lt 18)
        
        if (-not $isBg) {
            $objCount++
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

Write-Host "Total non-bg pixels: $objCount"
Write-Host "Bounding box: X=$minX..$maxX (Width=$($maxX-$minX)), Y=$minY..$maxY (Height=$($maxY-$minY))"

$src.Dispose()
