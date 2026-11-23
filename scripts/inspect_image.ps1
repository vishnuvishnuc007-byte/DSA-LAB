Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\acer\Desktop\DSAlab\public\images\dsa-hero-visual.png"
$bgPath = "C:\Users\acer\Desktop\DSAlab\public\images\syllabus-hero-bg.jpg"

$src = [System.Drawing.Bitmap]::FromFile($srcPath)
$bg = [System.Drawing.Bitmap]::FromFile($bgPath)

Write-Host "Source image dimensions: $($src.Width) x $($src.Height)"
Write-Host "Background image dimensions: $($bg.Width) x $($bg.Height)"

# Sample top-left and top-right background pixels to understand the background color
$c00 = $src.GetPixel(5, 5)
$cTopMid = $src.GetPixel([int]($src.Width / 2), 5)
$cBotLeft = $src.GetPixel(5, $src.Height - 10)
Write-Host "Sample corner 0,0: R=$($c00.R), G=$($c00.G), B=$($c00.B)"
Write-Host "Sample top mid: R=$($cTopMid.R), G=$($cTopMid.G), B=$($cTopMid.B)"
Write-Host "Sample bot left: R=$($cBotLeft.R), G=$($cBotLeft.G), B=$($cBotLeft.B)"

$src.Dispose()
$bg.Dispose()
