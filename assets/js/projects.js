/**

Данные проектов портфолио.
Единственный источник данных для карусели и модального окна (main.js).
Классический скрипт: без ES-модулей, без fetch — работает и через file://.
category: "web" | "bots" | "apps" | "engineering"
cover: локальный путь к изображению или "" (тогда рисуется градиентная заглушка)
link: внешний URL или "" (тогда показывается бейдж «Проект под NDA»)
*/
(function (global) {
"use strict";

var IMG = "assets/img/projects/";
var ENGEE = "https://engee.com/community/ru/catalogs/projects/";

global.PROJECTS = [
{
id: "meaxis",
title: "MeAxis",
subtitle: "Планировщик и финансы",
category: "web",
categoryLabel: "Web",
year: 2026,
tags: ["Flutter", "Dart", "SQLite", "Windows", "Android"],
cover: "",
link: "",
featured: true,
description: "Local-first приложение для задач, финансов и планирования с синхронизацией и шифрованием.",
details: "Полноценное приложение с модулями Focus (задачи, цели, привычки, рутины) и Finance (бюджеты, категории, отчёты, транзакции). Кроссплатформа: Windows, Android, iOS. Шифрование данных Ed25519, Premium-подписка с 30-дневным пробным периодом. Реализованы Smart Reminder, Smart Actions, Smart Goals, recurring-задачи и аналитика."
},
{
id: "tribes-backend",
title: "Tribes Backend",
subtitle: "Real-time платформа",
category: "web",
categoryLabel: "Web",
year: 2026,
tags: ["NestJS", "TypeScript", "PostgreSQL", "Redis", "Docker"],
cover: "",
link: "",
featured: true,
description: "NestJS + Fastify backend с WebSocket, аутентификацией, файлами и автодеплоем.",
details: "Серверная часть real-time платформы: NestJS 11 + Fastify, Drizzle ORM, PostgreSQL 17 + PostGIS, Redis, Socket.IO, MinIO для файлов, Directus как headless CMS. Web Push-уведомления, OTP-аутентификация (Telegram/Console), CI/CD через GitHub Actions с откатом при ошибке. Docker Compose для локальной разработки."
},
{
id: "vpn-kz",
title: "VPN (KZ/VK Tunnel)",
subtitle: "Кроссплатформенный клиент",
category: "apps",
categoryLabel: "Приложения",
year: 2026,
tags: ["Go", "C#", "Java", "sing-box", "WireGuard"],
cover: "",
link: "",
featured: false,
description: "VPN-клиент с поддержкой серверов KZ и VK: Windows, Android, iOS, macOS.",
details: "Защищённая сетевая инфраструктура для собственного использования. Сервер на sing-box/VLESS+Reality + WireGuard Peer. Клиенты для Windows (C#/WPF), Android (Java+Go/JNI), iOS/macOS (Go bridge). Система enrolement для безопасной выдачи конфигураций. Автообновление APK, тестовые сборки, CI/CD. Проект создан в соответствии с применимым законодательством."
},
{
id: "ritm-sdr-usrp",
title: "РИТМ SDR USRP",
subtitle: "Передача и приём сигналов",
category: "engineering",
categoryLabel: "Инженерия",
year: 2026,
tags: ["Engee", "Julia", "SDR", "РЧ-тракт"],
cover: IMG + "ritm-sdr-usrp-peredacha-i-priem-signalov-cherez-rch-trakt.jpg",
link: ENGEE + "ritm-sdr-usrp-peredacha-i-priem-signalov-cherez-rch-trakt",
featured: true,
description: "Настройка радиочастотного тракта и приём/передача сигналов на SDR USRP.",
details: "Полный путь от конфигурации оборудования до обработки данных: настройка РЧ-тракта, формирование и приём сигналов, визуализация спектра. Показаны практические аспекты работы с SDR-платформой USRP в среде Engee/Julia."
},
{
id: "tecno-server",
title: "TecnoServer",
subtitle: "Сервер на базе телефона",
category: "apps",
categoryLabel: "Приложения",
year: 2026,
tags: ["Termux", "SSH", "nginx", "ADB", "PowerShell"],
cover: "",
link: "",
featured: false,
description: "Headless-сервер на TECNO Phantom V Flip: SSH, ADB, nginx и автоматизация.",
details: "Телефон TECNO Phantom V Flip используется как headless-сервер с Termux (OpenSSH, nginx), ADB-доступом (USB+Wi-Fi), scrcpy для OTG-монитора. One-click PowerShell-скрипты для SSH-подключения, развёртывание статических сайтов, автоматизация через Termux:Boot."
},
{
id: "telegram-max-boty",
title: "Telegram- и MAX-боты",
subtitle: "Для бизнеса",
category: "bots",
categoryLabel: "Боты",
year: 2026,
tags: ["Python", "Telegram Bot API", "MAX", "CRM"],
cover: "",
link: "",
featured: true,
description: "Боты для заявок, оплат, уведомлений и админ-панелей с интеграцией CRM.",
details: "Разрабатываю ботов под задачи бизнеса: приём заявок, оплаты, уведомления, админ-панели, сценарии с AI и интеграция с CRM. Проекты коммерческие, детали и код — под NDA."
},
{
id: "crm-dlia-prodazh",
title: "CRM для отдела продаж",
subtitle: "Учёт клиентов и сделок",
category: "web",
categoryLabel: "Web",
year: 2026,
tags: ["Web", "SQL", "REST API", "CRM"],
cover: "",
link: "",
featured: false,
description: "Веб-система с клиентами, сделками, задачами, ролями и отчётами.",
details: "CRM для небольшой команды: карточки клиентов, воронка сделок, задачи и напоминания, роли и права, отчёты. Реализована как веб-приложение с REST API и SQL-базой. Проект коммерческий, подробности — под NDA."
},
{
id: "windows-android-utils",
title: "Приложения для Windows и Android",
subtitle: "Утилиты под задачу",
category: "apps",
categoryLabel: "Приложения",
year: 2026,
tags: ["Windows", "Android", "C++", "Python"],
cover: "",
link: "",
featured: false,
description: "Десктопные и мобильные приложения для автоматизации процессов.",
details: "Разрабатываю небольшие приложения под Windows и Android: обработка данных, интеграции с оборудованием, внутренние утилиты. Делаю от прототипа до сборки и передачи исходников."
}
];
})(window);
