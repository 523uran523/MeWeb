# Портфолио — Юрий Юрьев

Одностраничный сайт-портфолио инженера-программиста Юрия Юрьева: разработка сайтов, Telegram/MAX-ботов, CRM и веб-приложений, приложений для Windows и Android, инженерного ПО (ЦОС, ПЛИС, Engee).

- Живая страница: `http://127.0.0.1:4173/` после запуска локального сервера.
- Стиль: тёмный неон + градиенты, glassmorphism, адаптив, анимации при скролле.
- Контакты: Telegram `@Uran523523`, email `psihologgg@mail.ru`, телефон `+7 (996) 443-75-52`, HH, Engee.

## Структура проекта

- `index.html` — разметка всех секций: Hero, Обо мне, Услуги, Стек, Проекты, Контакты, footer и модальное окно проекта.
- `assets/css/style.css` — стили, дизайн-токены, адаптив, анимации, reduced motion.
- `assets/js/projects.js` — данные проектов в глобальной переменной `window.PROJECTS` (18 объектов).
- `assets/js/main.js` — рендер проектов, фильтры, карусель, модалка + hash-routing, анимации, меню, копирование email.
- `assets/img/projects/*.jpg` — локальные обложки проектов Engee (7 файлов).
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
- `category` — `engee`, `bots`, `web` или `apps`;
- `categoryLabel` — подпись фильтра;
- `year` — год;
- `tags` — массив тегов;
- `cover` — путь к изображению или `""`;
- `link` — внешняя ссылка или `""` (тогда показывается бейдж «Проект под NDA»);
- `featured` — выделенный проект;
- `description` — короткий текст карточки;
- `details` — длинный текст модального окна.

Обложку положить в `assets/img/projects/` и указать путь в `cover`.
