/**

Данные проектов портфолио.
Единственный источник данных для карусели и модального окна (main.js).
Классический скрипт: без ES-модулей, без fetch — работает и через file://.
category: "web" | "bots" | "apps" | "engineering"
cover: локальный путь к изображению или "" (тогда рисуется градиентная заглушка)
link: внешний URL или "" (кнопка «Открыть проект» в модальном окне скрывается)
*/
(function (global) {
"use strict";

var IMG = "assets/img/projects/";

global.PROJECTS = [
{
id: "meaxis",
title: "MeAxis",
subtitle: "Планировщик и финансы",
category: "web",
categoryLabel: "Web",
year: 2026,
tags: ["Flutter", "Dart", "SQLite", "Windows", "Android"],
cover: IMG + "meaxis-icon.png",
link: "",
featured: true,
description: "Local-first приложение для задач, финансов и планирования: шифрование, синхронизация, аналитика.",
details: "Полноценное приложение с модулями Focus (задачи, цели, привычки, рутины) и Finance (бюджеты, категории, отчёты, транзакции). Кроссплатформа: Windows, Android, iOS. Шифрование данных Ed25519, Premium-подписка с 30-дневным пробным периодом. Реализованы Smart Reminder, Smart Actions, Smart Goals, recurring-задачи и аналитика. Могу реализовать похожее приложение под ваши задачи."
},
{
id: "vpn-kz",
title: "VPN-клиенты и серверная часть",
subtitle: "Windows, Android, iOS, macOS",
category: "apps",
categoryLabel: "Приложения",
year: 2026,
tags: ["Go", "C#", "Java", "sing-box", "WireGuard"],
cover: IMG + "vpn-windows-main.png",
link: "",
description: "Кроссплатформенные VPN-клиенты и сервер на sing-box/WireGuard с автовыдачей конфигураций.",
details: "Защищённая сетевая инфраструктура: сервер на sing-box (VLESS + Reality) и WireGuard Peer. Клиенты для Windows (C#/WPF), Android (Java + Go/JNI), iOS и macOS (Go bridge). Система enrolement для безопасной выдачи конфигураций, автообновление APK, тестовые сборки, CI/CD. Готов развернуть защищённую сеть и клиенты под ваши требования."
},
{
id: "tecno-server",
title: "TecnoServer",
subtitle: "Сервер на базе телефона",
category: "apps",
categoryLabel: "Приложения",
year: 2026,
tags: ["Termux", "SSH", "nginx", "ADB", "PowerShell"],
cover: IMG + "tecno-server.jpg",
link: "",
featured: false,
description: "Headless-сервер из смартфона: SSH, ADB, nginx и автоматизация запуска.",
details: "TECNO Phantom V Flip работает как headless-сервер: Termux с OpenSSH и nginx, ADB-доступ по USB и Wi-Fi, scrcpy для вывода на OTG-монитор. One-click PowerShell-скрипты для подключения, развёртывание статических сайтов, автозапуск через Termux:Boot. Могу развернуть похожее решение на вашем оборудовании."
},
{
id: "engee",
title: "Инженерные проекты на Engee",
subtitle: "Алгоритмы, ПЛИС, SDR, Julia",
category: "engineering",
categoryLabel: "Инженерия",
year: 2026,
tags: ["Engee", "Julia", "ЦОС", "Verilog", "SDR", "Радиоканал", "ПЛИС"],
cover: IMG + "ritm-sdr-usrp-peredacha-i-priem-signalov-cherez-rch-trakt.jpg",
link: "",
featured: true,
description: "Набор инженерных проектов: алгоритмы ЦОС, РЧ-тракт, АЦП и модуляция, ПЛИС и Verilog, SDR-стенды, выбор радиоканала, расчёты на Julia.",
details: "Консолидированный набор инженерных проектов в сообществе Engee: цифровые фильтры и подавление помех, анализ радиолиний и доплеровского сдвига; нелинейность РЧ-усилителя, выбор радиоканала по мощности; влияние разрядности АЦП на приём 16-QAM; генерация кода Verilog для ПЛИС; настройка SDR/USRP, передача и приём сигналов, визуализация спектра; энергетика радиолинии; численные расчёты и визуализация на Julia. Могу разработать аналогичные алгоритмы и модели под ваши задачи."
},
{
id: "control-models",
title: "Моделирование и управление техническими системами",
subtitle: "Приводы, батареи, роботы",
category: "engineering",
categoryLabel: "Инженерия",
year: 2026,
tags: ["Моделирование", "BLDC", "BMS", "Робототехника"],
cover: IMG + "control-models.jpg",
link: "",
featured: false,
description: "Модели электроприводов, систем управления батареями и робототехнических узлов.",
details: "Трапецеидальное (шестишаговое) управление бесколлекторным двигателем, моделирование насос-форсунок и систем водоснабжения, модели BMS с балансировкой ячеек и защитой, управление рукой робота из САПР, моделирование полёта квадрокоптера. Готов построить модель под ваши технические условия."
},
{
id: "data-analysis",
title: "Анализ данных и машинное обучение",
subtitle: "Телеметрия, диагностика, ML",
category: "engineering",
categoryLabel: "Инженерия",
year: 2026,
tags: ["Python", "ML", "Телеметрия", "Статистика"],
cover: IMG + "data-analysis.jpg",
link: "",
featured: false,
description: "Разведочный анализ телеметрии, модели диагностики оборудования, автонастройка регуляторов.",
details: "Исследовательский анализ телеметрических данных промышленных объектов, модели случайного леса для акустической диагностики подшипников, автоматическая настройка параметров регуляторов, работа с большими объёмами измерений. Могу проанализировать ваши данные и построить модель."
},
{
id: "telegram-max-boty",
title: "Telegram- и MAX-боты",
subtitle: "Для бизнеса",
category: "bots",
categoryLabel: "Боты",
year: 2026,
tags: ["Python", "Telegram Bot API", "MAX", "CRM"],
cover: IMG + "telegram-bots.jpg",
link: "",
featured: true,
description: "Боты для заявок, оплат, уведомлений и админ-панелей с интеграцией CRM.",
details: "Разрабатываю ботов под задачи бизнеса: приём заявок, оплаты, уведомления, админ-панели, сценарии с AI и интеграция с CRM. Сделаю бота под ваш процесс — от прототипа до продакшена."
},
{
id: "crm-dlia-prodazh",
title: "CRM для отдела продаж",
subtitle: "Учёт клиентов и сделок",
category: "web",
categoryLabel: "Web",
year: 2026,
tags: ["Web", "SQL", "REST API", "CRM"],
cover: IMG + "crm-analytics.jpg",
link: "",
featured: false,
description: "Веб-система с клиентами, сделками, задачами, ролями и отчётами.",
details: "CRM для небольшой команды: карточки клиентов, воронка сделок, задачи и напоминания, роли и права, отчёты. Реализована как веб-приложение с REST API и SQL-базой. Готов собрать CRM под ваши бизнес-процессы."
},
{
id: "windows-android-utils",
title: "Приложения для Windows и Android",
subtitle: "Утилиты под задачу",
category: "apps",
categoryLabel: "Приложения",
year: 2026,
tags: ["Windows", "Android", "C#", "Python"],
cover: IMG + "windows-utils.jpg",
link: "",
featured: false,
description: "Десктопные и мобильные утилиты: обработка данных, интеграции с оборудованием.",
details: "Разрабатываю небольшие приложения под Windows и Android: обработка данных, интеграция с оборудованием, внутренние утилиты, автоматизация рутины. Делаю от прототипа до сборки и передачи исходников."
},
{
id: "ai-skills",
title: "AI Skills — навыки для агентов",
subtitle: "Промпты и автоматизация",
category: "apps",
categoryLabel: "Приложения",
year: 2026,
tags: ["Markdown", "Prompt", "Automation", "AI"],
cover: IMG + "ai-skills.jpg",
link: "",
featured: false,
description: "Наборы навыков для AI-агентов: инструкции, скрипты, шаблоны документов.",
details: "Специализированные навыки для AI-агентов: конфигурации промптов, шаблоны документов, скрипты автоматизации типовых задач. Готов собрать набор навыков под ваши рабочие процессы."
}
];
})(window);
