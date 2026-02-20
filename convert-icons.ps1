<#
Converts `icons/roan-logo.svg` into PNG icons of multiple sizes using ImageMagick.

Usage:
  Open PowerShell in the project folder and run:
    .\convert-icons.ps1

Requirements:
  - ImageMagick (`magick` command) installed and available in PATH.

This script will overwrite files in the `icons/` folder: icon-72x72.png, icon-96x96.png, icon-128x128.png, icon-144x144.png, icon-152x152.png, icon-192x192.png, icon-384x384.png, icon-512x512.png
#>

$svg = Join-Path $PSScriptRoot 'icons\roan-logo.svg'
if (-not (Test-Path $svg)) { Write-Error "SVG source not found: $svg"; exit 1 }

$sizes = @(72,96,128,144,152,192,384,512)

Write-Host "Checking for ImageMagick (magick)..." -ForegroundColor Cyan
try {
    & magick -version > $null 2>&1
} catch {
    Write-Error "ImageMagick not found. Install it from https://imagemagick.org and ensure 'magick' is in PATH."; exit 1
}

foreach ($s in $sizes) {
    $out = Join-Path $PSScriptRoot ("icons\icon-{0}x{0}.png" -f $s)
    Write-Host "Generating $out" -ForegroundColor Cyan
    & magick convert $svg -background none -resize "${s}x${s}" $out
}

Write-Host "Icon generation complete." -ForegroundColor Green
