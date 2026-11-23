Add-Type -AssemblyName System.Drawing

$p = "C:\Users\acer\Desktop\DSAlab\public\images\dsa-3d-objects.png"
$img = [System.Drawing.Bitmap]::FromFile($p)

Write-Host "Checking corners of cutout:"
$c0 = $img.GetPixel(0, 0)
$c1 = $img.GetPixel($img.Width-1, 0)
$c2 = $img.GetPixel(0, $img.Height-1)
$c3 = $img.GetPixel($img.Width-1, $img.Height-1)

Write-Host "(0,0) Alpha=$($c0.A), R=$($c0.R), G=$($c0.G), B=$($c0.B)"
Write-Host "(w-1,0) Alpha=$($c1.A), R=$($c1.R), G=$($c1.G), B=$($c1.B)"
Write-Host "(0,h-1) Alpha=$($c2.A), R=$($c2.R), G=$($c2.G), B=$($c2.B)"
Write-Host "(w-1,h-1) Alpha=$($c3.A), R=$($c3.R), G=$($c3.G), B=$($c3.B)"

$img.Dispose()
