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
details: "Серверная часть real-time платформы: NestJS 11 + Fastify, Drizzle ORM, PostgreSQL 17 + PostGIS, Redis, Socket.IO, MinIO для файлов, Directus как headless CMS. Web Push-уведомления, OTP-аутентификация (Telegram/Console), CI/CD через GitHub Actions с откатом при ошибке, Docker Compose для локальной разработки. Готов собрать такую же серверную архитектуру под ваш проект."
},
{
id: "tribes-app",
title: "Tribes App",
subtitle: "Клиентское приложение",
category: "web",
categoryLabel: "Web",
year: 2026,
tags: ["React", "TypeScript", "WebSocket", "PWA"],
cover: "",
link: "",
featured: true,
description: "Веб-клиент платформы: real-time лента, уведомления, офлайн-режим, PWA.",
details: "Клиентская часть платформы Tribes: React + TypeScript, WebSocket-соединения, Service Worker для офлайн-режима, установка как PWA. Интеграция с backend API, система уведомлений, адаптивный интерфейс под мобильные и десктоп. Могу сделать аналогичный веб-клиент для вашего сервиса."
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
cover: "",
link: "",
featured: false,
description: "Headless-сервер из смартфона: SSH, ADB, nginx и автоматизация запуска.",
details: "TECNO Phantom V Flip работает как headless-сервер: Termux с OpenSSH и nginx, ADB-доступ по USB и Wi-Fi, scrcpy для вывода на OTG-монитор. One-click PowerShell-скрипты для подключения, развёртывание статических сайтов, автозапуск через Termux:Boot. Могу развернуть похожее решение на вашем оборудовании."
},
{
id: "dsp-signals",
title: "Алгоритмы ЦОС и системы связи",
subtitle: "Фильтрация, модуляция, радиолинии",
category: "engineering",
categoryLabel: "Инженерия",
year: 2026,
tags: ["ЦОС", "Julia", "BPSK", "Фильтры", "Спутниковая связь"],
cover: IMG + "ritm-sdr-usrp-peredacha-i-priem-signalov-cherez-rch-trakt.jpg",
link: "",
featured: true,
description: "Цифровые фильтры, подавление помех, анализ радиолиний и доплеровского сдвига.",
details: "Практические задачи обработки сигналов: подбор полосы приёмника на VariableBandwidthIIRFilter, подавление узкополосной помехи в BPSK-сигнале, расчёт влияния доплеровского сдвига на спутниковую радиолинию, формирование и приём сигналов через РЧ-тракт. Могу разработать алгоритмы обработки сигналов под вашу задачу."
},
{
id: "rf-frontend",
title: "РЧ-тракт и помехоустойчивость",
subtitle: "Усилители, фильтры, выбор канала",
category: "engineering",
categoryLabel: "Инженерия",
year: 2026,
tags: ["РЧ-тракт", "Усилители", "Помехи", "Радиоканал"],
cover: IMG + "nelineinost-radiochastotnogo-usilitelia.jpg",
link: "",
featured: false,
description: "Нелинейность радиочастотного усилителя, выбор радиоканала по мощности сигнала.",
details: "Анализ аналоговой части радиотракта: нелинейные искажения усилителя и их влияние на спектр, выбор рабочего радиоканала по уровню мощности сигнала, оценка полосы и избирательности приёмного тракта. Практические измерения и моделирование."
},
{
id: "adc-modulation",
title: "АЦП и цифровые виды модуляции",
subtitle: "Разрядность и качество приёма",
category: "engineering",
categoryLabel: "Инженерия",
year: 2026,
tags: ["АЦП", "16-QAM", "Модуляция", "Демодуляция"],
cover: IMG + "vliianie-razriadnosti-atsp-na-priem-16-qam.jpg",
link: "",
featured: false,
description: "Как разрядность АЦП влияет на приём многопозиционных сигналов вроде 16-QAM.",
details: "Оценка влияния разрядности АЦП на качество приёма 16-QAM: шум квантования, ошибка вектора, деградация созвездия, требования к динамическому диапазону тракта. Моделирование демодулятора и расчёт показателей качества."
},
{
id: "fpga-verilog",
title: "ПЛИС и генерация HDL-кода",
subtitle: "Verilog, цифровые устройства",
category: "engineering",
categoryLabel: "Инженерия",
year: 2026,
tags: ["ПЛИС", "Verilog", "HDL", "Цифровая логика"],
cover: IMG + "vozmozhnosti-generatsii-koda-verilog.jpg",
link: "",
featured: false,
description: "Генерация кода Verilog из моделей, разработка цифровых устройств на ПЛИС.",
details: "Генерация синтезируемого кода Verilog из моделей, разработка цифровых устройств для ПЛИС, проверка соответствия поведения модели и RTL-описания. Работа с отечественными платформами и микроконтроллерами."
},
{
id: "sdr-stands",
title: "SDR-стенды и измерения",
subtitle: "USRP, визуализация спектра",
category: "engineering",
categoryLabel: "Инженерия",
year: 2026,
tags: ["SDR", "USRP", "Измерения", "Спектр"],
cover: IMG + "nachalo-raboty-s-ritm-sdr-usrp.jpg",
link: "",
featured: false,
description: "Настройка SDR-оборудования, передача и приём сигналов, визуализация спектра.",
details: "Полный цикл работы с SDR-платформой USRP: конфигурация оборудования, калибровка, передача и приём сигналов, построение спектрограмм и анализ данных. Готов собрать измерительный стенд под ваши задачи."
},
{
id: "radio-channel",
title: "Выбор радиоканала и энергетика линии",
subtitle: "Мощность сигнала и дальность",
category: "engineering",
categoryLabel: "Инженерия",
year: 2026,
tags: ["Радиоканал", "Энергетика", "Дальность", "Помехи"],
cover: IMG + "vybor-radiokanala-po-moshchnosti-signala.jpg",
link: "",
featured: false,
description: "Выбор рабочего канала по уровню мощности, оценка энергетики радиолинии.",
details: "Измерение и сравнение уровня мощности в каналах, выбор наименее зашумлённого, оценка бюджета радиолинии и запаса на замирания. Практические примеры с реальным оборудованием."
},
{
id: "julia-computing",
title: "Julia и инженерные расчёты",
subtitle: "Вычислительные модели и скрипты",
category: "engineering",
categoryLabel: "Инженерия",
year: 2026,
tags: ["Julia", "Численные методы", "Расчёты", "Визуализация"],
cover: IMG + "vozmozhnosti-iazyka.jpg",
link: "",
featured: false,
description: "Численные расчёты, визуализация данных и инженерные скрипты на Julia.",
details: "Вычислительные модели и инженерные скрипты на Julia: численные методы, обработка массивов, построение графиков и визуализация результатов, работа с большими числами и точностью вычислений. Могу автоматизировать ваши расчёты."
},
{
id: "control-models",
title: "Моделирование и управление техническими системами",
subtitle: "Приводы, батареи, роботы",
category: "engineering",
categoryLabel: "Инженерия",
year: 2026,
tags: ["Моделирование", "BLDC", "BMS", "Робототехника"],
cover: "",
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
cover: "",
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
cover: "",
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
cover: "",
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
cover: "",
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
cover: "",
link: "",
featured: false,
description: "Наборы навыков для AI-агентов: инструкции, скрипты, шаблоны документов.",
details: "Специализированные навыки для AI-агентов: конфигурации промптов, шаблоны документов, скрипты автоматизации типовых задач. Готов собрать набор навыков под ваши рабочие процессы."
}
];
})(window);
