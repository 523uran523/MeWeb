/**

Данные проектов портфолио.
Единственный источник данных для карусели и модального окна (main.js).
Классический скрипт: без ES-модулей, без fetch — работает и через file://.
category: "engee" | "bots" | "web" | "apps"
cover: локальный путь к изображению или "" (тогда рисуется градиентная заглушка)
link: внешний URL или "" (тогда показывается бейдж «Проект под NDA»)
*/
(function (global) {
"use strict";

var IMG = "assets/img/projects/";
var ENGEE = "https://engee.com/community/ru/catalogs/projects/";

global.PROJECTS = [
{
id: "ritm-sdr-usrp",
title: "Передача и приём сигналов через РЧ-тракт",
subtitle: "РИТМ SDR USRP",
category: "engee",
categoryLabel: "Engee",
year: 2026,
tags: ["Engee", "Julia", "SDR", "РЧ"],
cover: IMG + "ritm-sdr-usrp-peredacha-i-priem-signalov-cherez-rch-trakt.jpg",
link: ENGEE + "ritm-sdr-usrp-peredacha-i-priem-signalov-cherez-rch-trakt",
featured: true,
description: "Приём и передача радиосигналов через радиочастотный тракт на платформе SDR.",
details: "Практический пример работы с РИТМ SDR USRP: настройка радиочастотного тракта, формирование и приём сигналов, визуализация спектра и анализ результата. Проект показывает полный путь от конфигурации оборудования до обработки данных в Engee."
},
{
id: "nachalo-raboty-s-ritm-sdr-usrp",
title: "Начало работы с РИТМ SDR USRP",
subtitle: "Подключение и первый сигнал",
category: "engee",
categoryLabel: "Engee",
year: 2026,
tags: ["Engee", "Julia", "SDR"],
cover: IMG + "nachalo-raboty-s-ritm-sdr-usrp.jpg",
link: ENGEE + "nachalo-raboty-s-ritm-sdr-usrp",
featured: true,
description: "Пошаговый старт с SDR USRP: настройка окружения и первый приём сигнала.",
details: "Разбираем подключение РИТМ SDR USRP, установку и настройку окружения, работу с пакетом ritm_sdr_core.jl и первый приём сигнала. Подойдёт инженерам, которые только знакомятся с SDR-платформой."
},
{
id: "vozmozhnosti-iazyka",
title: "Возможности языка Julia",
subtitle: "Практический обзор",
category: "engee",
categoryLabel: "Engee",
year: 2026,
tags: ["Engee", "Julia"],
cover: IMG + "vozmozhnosti-iazyka.jpg",
link: ENGEE + "vozmozhnosti-iazyka",
featured: false,
description: "Синтаксис и практические приёмы Julia на примерах для инженерных задач.",
details: "Обзор ключевых возможностей Julia: типы, функции, массивы, работа с пакетами и производительность. Примеры адаптированы под инженерные расчёты и среду Engee."
},
{
id: "vozmozhnosti-generatsii-koda-verilog",
title: "Возможности генерации кода Verilog",
subtitle: "Из модели — на ПЛИС",
category: "engee",
categoryLabel: "Engee",
year: 2026,
tags: ["Engee", "Verilog", "FPGA"],
cover: IMG + "vozmozhnosti-generatsii-koda-verilog.jpg",
link: ENGEE + "vozmozhnosti-generatsii-koda-verilog",
featured: true,
description: "Автоматическая генерация Verilog-кода из моделей Engee и проверка на ПЛИС.",
details: "Показываю, как Engee генерирует синтезируемый Verilog-код из модели, какие ограничения нужно учитывать и как проверить результат на ПЛИС. Материал будет полезен при переходе от моделирования к аппаратной реализации."
},
{
id: "nelineinost-radiochastotnogo-usilitelia",
title: "Нелинейность радиочастотного усилителя",
subtitle: "Три модели Amplifier (IB)",
category: "engee",
categoryLabel: "Engee",
year: 2026,
tags: ["Engee", "Julia", "RF"],
cover: IMG + "nelineinost-radiochastotnogo-usilitelia.jpg",
link: ENGEE + "nelineinost-radiochastotnogo-usilitelia",
featured: false,
description: "Сравнение трёх моделей нелинейности усилителя из библиотеки РФ-блоков Engee.",
details: "В примере сравниваются три модели нелинейности блока Amplifier (IB) из библиотеки радиочастотных блоков Engee. Показано, как выбор модели влияет на спектр, искажения и итоговые характеристики тракта."
},
{
id: "vliianie-razriadnosti-atsp-na-priem-16-qam",
title: "Влияние разрядности АЦП на приём 16-QAM",
subtitle: "Квантование I/Q",
category: "engee",
categoryLabel: "Engee",
year: 2026,
tags: ["Engee", "Julia", "DSP"],
cover: IMG + "vliianie-razriadnosti-atsp-na-priem-16-qam.jpg",
link: ENGEE + "vliianie-razriadnosti-atsp-na-priem-16-qam",
featured: false,
description: "Как 2 и 4 бита Flash ADC влияют на созвездие и EVM в 16-QAM.",
details: "Пример показывает, как квантование I/Q-составляющих 16-QAM блоками Flash ADC с разрядностью 2 и 4 бита влияет на созвездие и EVM. Наглядная демонстрация компромисса между стоимостью АЦП и качеством приёма."
},
{
id: "vybor-radiokanala-po-moshchnosti-signala",
title: "Выбор радиоканала по мощности сигнала",
subtitle: "Полифазный банк фильтров",
category: "engee",
categoryLabel: "Engee",
year: 2026,
tags: ["Engee", "Julia", "DSP"],
cover: IMG + "vybor-radiokanala-po-moshchnosti-signala.jpg",
link: ENGEE + "vybor-radiokanala-po-moshchnosti-signala",
featured: false,
description: "Разделение сигнала на полосы с помощью EngeeDSP.Channelizer.",
details: "Пример показывает, как полифазный банк фильтров EngeeDSP.Channelizer разделяет сигнал на полосы, после чего можно выбрать канал с наибольшей мощностью. Такой подход применяется в динамическом выборе частоты и мониторинге эфира."
},
{
id: "telegram-max-boty",
title: "Telegram- и MAX-боты для бизнеса",
subtitle: "Коммерческая разработка",
category: "bots",
categoryLabel: "Боты",
year: 2026,
tags: ["Python", "Telegram Bot API", "MAX", "CRM"],
cover: "",
link: "",
featured: true,
description: "Боты для заявок, оплат и уведомлений с интеграцией CRM.",
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
description: "Простые десктопные и мобильные приложения для автоматизации процессов.",
details: "Разрабатываю небольшие приложения под Windows и Android: обработка данных, интеграции с оборудованием, внутренние утилиты. Делаю от прототипа до сборки и передачи исходников."
}
];
})(window);
