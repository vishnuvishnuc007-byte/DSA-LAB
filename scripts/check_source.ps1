Add-Type -AssemblyName System.Drawing

$p = "C:\Users\acer\Desktop\DSAlab\public\images\syllabus-3d-structure.png"
if (Test-Path $p) {
    $s = [System.Drawing.Bitmap]::FromFile($p)
    Write-Host "syllabus-3d-structure.png dimensions: $($s.Width) x $($s.Height)"
    $s.Dispose()
}

$ref = "C:\Users\acer\Desktop\DSAlab\public\assets\syllabus-reference.jpg"
if (Test-Path $ref) {
    $r = [System.Drawing.Bitmap]::FromFile($ref)
    Write-Host "syllabus-reference.jpg dimensions: $($r.Width) x $($r.Height)"
    $r.Dispose()
}
