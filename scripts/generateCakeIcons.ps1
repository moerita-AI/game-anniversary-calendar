Add-Type -AssemblyName System.Drawing

$projectRoot = Split-Path -Parent $PSScriptRoot
$iconDirectory = Join-Path $projectRoot "public\icons"
New-Item -ItemType Directory -Path $iconDirectory -Force | Out-Null

function New-RoundedRectanglePath {
  param(
    [float]$X,
    [float]$Y,
    [float]$Width,
    [float]$Height,
    [float]$Radius
  )

  $path = [System.Drawing.Drawing2D.GraphicsPath]::new()
  $diameter = $Radius * 2
  $path.AddArc($X, $Y, $diameter, $diameter, 180, 90)
  $path.AddArc($X + $Width - $diameter, $Y, $diameter, $diameter, 270, 90)
  $path.AddArc($X + $Width - $diameter, $Y + $Height - $diameter, $diameter, $diameter, 0, 90)
  $path.AddArc($X, $Y + $Height - $diameter, $diameter, $diameter, 90, 90)
  $path.CloseFigure()
  return $path
}

function New-CakeIcon {
  param(
    [int]$Size,
    [string]$FileName
  )

  $bitmap = [System.Drawing.Bitmap]::new($Size, $Size)
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $graphics.ScaleTransform($Size / 512.0, $Size / 512.0)

  $backgroundArea = [System.Drawing.RectangleF]::new(0, 0, 512, 512)
  $background = [System.Drawing.Drawing2D.LinearGradientBrush]::new(
    $backgroundArea,
    [System.Drawing.ColorTranslator]::FromHtml("#FFFAF1"),
    [System.Drawing.ColorTranslator]::FromHtml("#F8F1E6"),
    45
  )
  $bottomCake = [System.Drawing.SolidBrush]::new([System.Drawing.ColorTranslator]::FromHtml("#F4D79B"))
  $bottomFrosting = [System.Drawing.SolidBrush]::new([System.Drawing.ColorTranslator]::FromHtml("#EA8792"))
  $flame = [System.Drawing.SolidBrush]::new([System.Drawing.ColorTranslator]::FromHtml("#FFC34A"))
  $plate = [System.Drawing.SolidBrush]::new([System.Drawing.ColorTranslator]::FromHtml("#CBDCDF"))

  $graphics.FillRectangle($background, 0, 0, 512, 512)

  $platePath = New-RoundedRectanglePath -X 67 -Y 415 -Width 378 -Height 28 -Radius 14
  $bottomCakePath = New-RoundedRectanglePath -X 75 -Y 285 -Width 362 -Height 140 -Radius 30
  $bottomFrostingPath = New-RoundedRectanglePath -X 75 -Y 258 -Width 362 -Height 68 -Radius 28

  $graphics.FillPath($plate, $platePath)
  $graphics.FillPath($bottomCake, $bottomCakePath)
  $graphics.FillPath($bottomFrosting, $bottomFrostingPath)

  $candleColors = @("#5FB8D0", "#D95D68", "#E7A848")
  $candleXs = @(176, 246, 316)
  $flamePaths = @()
  for ($index = 0; $index -lt $candleXs.Count; $index++) {
    $x = $candleXs[$index]
    $candleBrush = [System.Drawing.SolidBrush]::new([System.Drawing.ColorTranslator]::FromHtml($candleColors[$index]))
    $candlePath = New-RoundedRectanglePath -X $x -Y 126 -Width 20 -Height 145 -Radius 8
    $graphics.FillPath($candleBrush, $candlePath)

    $stripePen = [System.Drawing.Pen]::new([System.Drawing.ColorTranslator]::FromHtml("#FFF8EA"), 5)
    $stripePen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $graphics.DrawLine($stripePen, $x + 10, 140, $x + 10, 250)

    $center = $x + 10
    $flamePath = [System.Drawing.Drawing2D.GraphicsPath]::new()
    $flamePath.AddBezier($center, 77, $center - 18, 96, $center - 12, 126, $center, 126)
    $flamePath.AddBezier($center, 126, $center + 16, 126, $center + 19, 96, $center, 77)
    $flamePath.CloseFigure()
    $graphics.FillPath($flame, $flamePath)
    $flamePaths += $flamePath

    $candlePath.Dispose()
    $candleBrush.Dispose()
    $stripePen.Dispose()
  }

  foreach ($resource in @($platePath, $bottomCakePath, $bottomFrostingPath, $background, $bottomCake, $bottomFrosting, $flame, $plate) + $flamePaths) {
    $resource.Dispose()
  }

  $graphics.Dispose()
  $outputPath = Join-Path $iconDirectory $FileName
  $bitmap.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $bitmap.Dispose()
}

New-CakeIcon -Size 32 -FileName "favicon-32.png"
New-CakeIcon -Size 180 -FileName "apple-touch-icon.png"
New-CakeIcon -Size 192 -FileName "cake-192.png"
New-CakeIcon -Size 512 -FileName "cake-512.png"
