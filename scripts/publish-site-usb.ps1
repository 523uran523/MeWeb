param()
$ErrorActionPreference = "Stop"
$adb = "C:\Users\523ur\AppData\Local\Android\Sdk\platform-tools\adb.exe"
$serial = "1054325396000818"
$site = "C:\Users\523ur\Documents\MyProjects\MeWeb"
if (!(Test-Path $site)) { throw "Site folder not found: $site" }

Write-Host "[1/4] Check ADB"
& $adb devices
if ((& $adb devices) -notmatch $serial) { throw "Phone not connected via USB (serial $serial)" }

Write-Host "[2/4] Push site to temp on phone"
& $adb -s $serial push $site /data/local/tmp/MeWeb
if ($LASTEXITCODE -ne 0) { throw "ADB push failed" }

Write-Host "[3/4] Copy into Termux home"
& $adb -s $serial shell "run-as com.termux rm -rf /data/data/com.termux/files/home/MeWeb"
& $adb -s $serial shell "run-as com.termux cp -r /data/local/tmp/MeWeb /data/data/com.termux/files/home/MeWeb"
if ($LASTEXITCODE -ne 0) { throw "Failed to copy MeWeb into Termux home" }

Write-Host "[4/4] Validate and reload Nginx"
& $adb -s $serial shell "run-as com.termux /data/data/com.termux/files/usr/bin/nginx -t -c /data/data/com.termux/files/home/nginx.conf 2>&1"
& $adb -s $serial shell "run-as com.termux /data/data/com.termux/files/usr/bin/nginx -s reload 2>&1"
Write-Host "Site published to /data/data/com.termux/files/home/MeWeb"
