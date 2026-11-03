# Start-Global-Phone-Site.ps1
# Publishes MeWeb through USB ADB forward + Cloudflare Quick Tunnel.
param(
    [string]$Serial = "1054325396000818",
    [string]$CfExe = "C:\Program Files (x86)\cloudflared\cloudflared.exe"
)

$ErrorActionPreference = "Stop"
$root = "C:\Users\523ur\Downloads\mini"
$log = Join-Path $root "quick-tunnel-meweb.log"

Write-Host "[*] ADB forward 8080 -> phone 8080..."
adb -s $Serial forward tcp:8080 tcp:8080 | Out-Null
Start-Sleep -Seconds 2

$health = Invoke-WebRequest -Uri "http://localhost:8080" -UseBasicParsing -TimeoutSec 10
Write-Host "[+] Phone answered $($health.StatusCode), $($health.RawContentLength) bytes"

Remove-Item $log -ErrorAction SilentlyContinue
$proc = Start-Process cmd.exe -ArgumentList "/c","""$CfExe"" tunnel --url http://localhost:8080 > $log 2>&1" -WindowStyle Hidden -PassThru -WorkingDirectory (Split-Path $CfExe)
Start-Sleep -Seconds 20

$line = Get-Content $log -ErrorAction SilentlyContinue | Select-String -Pattern "https://.*trycloudflare.com" | Select-Object -First 1
if (-not $line) { throw "Cloudflare URL not found in $log" }
$url = ($line.Line -split "\|" | ForEach-Object { $_.Trim() } | Where-Object { $_ -match "https://.*trycloudflare.com" }) | Select-Object -First 1
if (-not $url) { $url = ($line.Line -split '\s+' | Where-Object { $_ -match "https://.*trycloudflare.com" }) | Select-Object -First 1 }

Write-Host "`n[+] Public URL: $url" -ForegroundColor Green
Set-Clipboard -Value $url 2>$null
Write-Host "[i] URL copied to clipboard. Log: $log"
