# MeWeb — Deployment

## Что это

Статический одностраничный сайт-портфолио. Без сборки и внешних зависимостей.
Хостится на телефоне Tecno (Turnux + nginx) по адресу `http://<phone>:8080`,
снаружи — через Cloudflare Quick Tunnel (random URL) или Named Tunnel.

## Первичная установка

1. Установить Termux на телефон, внутри: `pkg install nginx openssh`.
2. Скопировать `config/nginx.conf` в `/data/data/com.termux/files/home/nginx.conf`.
3. Установить Termux:Boot и положить `scripts/termux-autonomous.sh` в
   `~/.termux/boot/start-web.sh` (chmod +x).
4. Перезагрузить телефон.

## Обновление сайта с ПК по USB

```powershell
Set-Location C:\Users\523ur\Documents\MyProjects\MeWeb
.\scripts\publish-site-usb.ps1
.\scripts\health.ps1
```

После этого открыть `http://127.0.0.1:8080` (через `adb forward tcp:8080 tcp:8080`).

## Публичный доступ

```powershell
.\scripts\start-global-phone-site.ps1
```

Скрипт выведет и скопирует в буфер Cloudflare-URL `https://...trycloudflare.com`.

## Проверки перед релизом

```powershell
node --check assets/js/projects.js
node --check assets/js/main.js
```
