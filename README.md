# Портфолио — Юрий Юрьев

Одностраничный сайт-портфолио инженера-программиста Юрия Юрьева: разработка сайтов, Telegram/MAX-ботов, CRM и веб-приложений, приложений для Windows и Android, инженерного ПО (ЦОС, ПЛИС, Engee).

- Живая страница: `http://127.0.0.1:4173/` после запуска локального сервера.
- Стиль: тёмный неон + градиенты, glassmorphism, адаптив, анимации при скролле.
- Контакты: Telegram `@Uran523523`, email `psihologgg@mail.ru`, телефон `+7 (996) 443-75-52`, HH, Engee.

## Структура проекта

- `index.html` — разметка всех секций: Hero, Обо мне, Услуги, Стек, Проекты, Контакты, footer и модальное окно проекта.
- `assets/css/style.css` — стили, дизайн-токены, адаптив, анимации, reduced motion.
- `assets/js/projects.js` — данные проектов в глобальной переменной `window.PROJECTS` (10 объектов).
- `assets/js/main.js` — рендер проектов, фильтры, карусель, модалка + hash-routing, анимации, меню, копирование email.
- `assets/img/projects/*.jpg` — локальные обложки проектов (инженерные работы Engee + тематические иллюстрации).
- `tools/serve.cjs` — простой статический HTTP-сервер для локальной проверки.
- `package.json` — команды `npm start` / `npm run serve`.
- `contract.json` — контракт файлов, ID и владельцев.
- `gate.json` — конфиг проверок Tier 0 / Tier 1.
- `task.md` — исходное техническое задание и полный контент страницы.

## Как запустить

```powershell
Set-Location C:\Users\523ur\Documents\MyProjects\MeWeb
npm start
```

Открыть в браузере: `http://127.0.0.1:4173/`.

## Проверки

```powershell
node --check assets/js/projects.js
node --check assets/js/main.js
node "C:\Users\523ur\Documents\MyProjects\Skills\dual-chat-dev\scripts\chat-dev.cjs" gate --project . --config gate.json --json
```

## Как добавлять проекты

Добавить новый объект в массив в `assets/js/projects.js`. Поля:

- `id` — уникальный идентификатор проекта;
- `title`, `subtitle` — заголовок и подпись;
- `category` — `engineering`, `bots`, `web` или `apps`;
- `categoryLabel` — подпись фильтра;
- `year` — год;
- `tags` — массив тегов;
- `cover` — путь к изображению или `""`;
- `link` — внешняя ссылка или `""` (кнопка «Открыть проект» скрывается);
- `featured` — выделенный проект;
- `description` — короткий текст карточки;
- `details` — длинный текст модального окна.

Обложку положить в `assets/img/projects/` и указать путь в `cover`.

## Лицензии обложек

Изображения хранятся локально в `assets/img/projects/`. Для коммерческого использования берутся только CC0 / Public Domain, кроме одной иллюстрации под CC BY.

- `telegram-bots.jpg` — «Telegram app icon on smartphone screen (perspective render)», автор Yuri Samoilov, лицензия [CC BY 2.0](https://creativecommons.org/licenses/by/2.0), источник: [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Telegram_app_icon_on_smartphone_screen_(perspective_render)_(49896396508).jpg). Изменения: кадрирование и пережатие.
- `ai-skills.jpg` — «Lines of code» / «Code on computer monitor» (Unsplash), CC0, Wikimedia Commons.
- `control-models.jpg` — «Industrial Manipulator», CC0, Wikimedia Commons.
- `crm-analytics.jpg` — «Analytics 2016-02-26 at 10.19.24 AM», CC0, Wikimedia Commons.
- `data-analysis.jpg` — «Neural network — Midjourney and Grok», Public Domain, Wikimedia Commons.
- `tecno-server.jpg` — «Smartphone display screen», CC0, Wikimedia Commons.
- `windows-utils.jpg` — «Gadgets on a desk» (Unsplash), CC0, Wikimedia Commons.
- Остальные обложки — скриншоты и материалы собственных проектов автора.
