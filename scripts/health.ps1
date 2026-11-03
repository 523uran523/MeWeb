param()
$ErrorActionPreference = "Stop"
$adb = "C:\Users\523ur\AppData\Local\Android\Sdk\platform-tools\adb.exe"

Write-Host "=== ADB devices ==="
& $adb devices

Write-Host "`n=== Connection ==="
$dev = & $adb devices 2>&1
if ($dev -match '1054325396000818') {
    $target = "1054325396000818"
} elseif ($dev -match '([0-9]+\.[0-9]+\.[0-9]+\.[0-9]+:5555)') {
    $target = $Matches[1]
} else {
    throw "No ADB phone connected"
}
Write-Host "Using: $target"

Write-Host "`n=== Wi-Fi IP ==="
$ip = & $adb -s $target shell "ip -4 addr show wlan0 2>/dev/null"
$ipm = [regex]::Match($ip, 'inet\s+(\d+\.\d+\.\d+\.\d+)')
Write-Host "Wi-Fi IP: $($ipm.Groups[1].Value)"

Write-Host "`n=== Processes ==="
& $adb -s $target shell "ps -A -o PID,NAME 2>/dev/null | grep -E 'sshd|nginx' || true"

Write-Host "`n=== Local (USB forward) ==="
try {
  $r = Invoke-WebRequest -Uri "http://127.0.0.1:8080" -UseBasicParsing -TimeoutSec 5
  Write-Host "http://127.0.0.1:8080 -> $($r.StatusCode) ($($r.RawContentLength) bytes)"
} catch { Write-Host "http://127.0.0.1:8080 -> $($_.Exception.Message)" }

Write-Host "`n=== Nginx config check ==="
& $adb -s $target shell "run-as com.termux /data/data/com.termux/files/usr/bin/nginx -t -c /data/data/com.termux/files/home/nginx.conf 2>&1"
