<#
Helper script to run ngrok and forward your local Live Server (port 5500).

Usage:
1. Download ngrok from https://ngrok.com and place the executable in your PATH or this folder.
2. (Optional) Authenticate with `ngrok authtoken <your-token>` if you want a stable subdomain.
3. From PowerShell in this project folder run:
   .\start-ngrok.ps1

The script will start ngrok and print the HTTPS forwarding URL. Open that HTTPS URL on your iPhone Safari, then use Share → Add to Home Screen.

#>

$port = 5500
Write-Host "Starting ngrok to forward local port $port..." -ForegroundColor Cyan
Write-Host "If ngrok is not installed, download it from https://ngrok.com/download" -ForegroundColor Yellow

# Prefer local executable if present
$ngrokExe = Join-Path $PSScriptRoot 'ngrok.exe'
if (Test-Path $ngrokExe) {
    & $ngrokExe http $port
} else {
    # fallback to PATH
    & ngrok http $port
}