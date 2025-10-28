# EduMVP - Онлайн школа

Современная платформа для онлайн-обучения с модульной архитектурой.

## 🚀 Технологии

- **Frontend**: React + Vite + TypeScript + TailwindCSS
- **Backend**: Node.js + NestJS + Prisma + PostgreSQL
- **State Management**: React Query
- **Authentication**: JWT
- **Code Quality**: ESLint + Prettier + Husky

## 📁 Структура проекта

```
EduMVP/
├── src/                    # Frontend код
│   ├── app/               # Входные файлы и роутинг
│   ├── modules/           # Функциональные модули
│   │   ├── auth/         # Авторизация
│   │   ├── courses/      # Курсы
│   │   └── profile/      # Профиль
│   ├── hooks/            # Кастомные хуки
│   ├── services/         # API сервисы
│   ├── utils/            # Утилиты
│   └── styles/           # Глобальные стили
├── server/               # Backend код
│   ├── src/
│   │   ├── modules/      # NestJS модули
│   │   │   ├── auth/    # Модуль авторизации
│   │   │   ├── users/   # Модуль пользователей
│   │   │   └── courses/ # Модуль курсов
│   │   └── common/      # Общие утилиты
│   └── prisma/          # Prisma схема
└── dist/                # Сборка

```

## 🛠️ Установка и запуск

### Предварительные требования

- Node.js >= 18.0.0
- PostgreSQL >= 14.0
- npm или yarn

### 1. Клонирование репозитория

\`\`\`bash
git clone <repository-url>
cd EduMVP
\`\`\`

### 2. Установка зависимостей

\`\`\`bash
# Установка зависимостей для frontend
npm install

# Установка зависимостей для backend
cd server
npm install
cd ..
\`\`\`

### 3. Настройка переменных окружения

Скопируйте файл `.env.example` в `.env`:

\`\`\`bash
cp .env.example .env
\`\`\`

Отредактируйте `.env` файл и укажите ваши настройки:

\`\`\`env
# Frontend
VITE_API_URL=http://localhost:3001

# Backend
PORT=3001
NODE_ENV=development

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/edumvp

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
\`\`\`

### 4. Настройка базы данных

\`\`\`bash
# Перейдите в папку server
cd server

# Примените миграции Prisma
npx prisma migrate dev

# Генерируйте Prisma Client
npx prisma generate

# (Опционально) Заполните базу тестовыми данными
npx prisma db seed
\`\`\`

### 5. Запуск приложения

#### Development режим

В двух терминалах:

**Терминал 1 - Backend:**
\`\`\`bash
cd server
npm run start:dev
\`\`\`

**Терминал 2 - Frontend:**
\`\`\`bash
npm run dev
\`\`\`

Или запустите оба одновременно:
\`\`\`bash
# Backend
npm run dev:server

# Frontend  
npm run dev
\`\`\`

Приложение будет доступно по адресам:
- Frontend: http://localhost:5173
- Backend: http://localhost:3001

#### Production режим

\`\`\`bash
# Сборка frontend
npm run build

# Сборка backend
npm run build:server

# Запуск backend
cd server
npm run start:prod
\`\`\`

## 📝 Скрипты

### Frontend

- \`npm run dev\` - Запустить dev сервер
- \`npm run build\` - Собрать production версию
- \`npm run preview\` - Предпросмотр production сборки
- \`npm run lint\` - Проверить код с ESLint
- \`npm run lint:fix\` - Исправить ошибки ESLint
- \`npm run format\` - Форматировать код с Prettier
- \`npm run format:check\` - Проверить форматирование
- \`npm run type-check\` - Проверить типы TypeScript

### Backend

- \`npm run start:dev\` - Запустить dev сервер с hot-reload
- \`npm run start:prod\` - Запустить production сервер
- \`npm run build\` - Собрать backend
- \`npm run lint\` - Проверить код с ESLint
- \`npm test\` - Запустить тесты

## 🧪 Тестирование

\`\`\`bash
# Запустить все тесты
npm test

# Запустить с coverage
npm run test:cov

# E2E тесты
cd server
npm run test:e2e
\`\`\`

## 🏗️ Архитектура

### Frontend

- **Модульная структура**: Каждый функциональный модуль (auth, courses, profile) имеет свою папку с компонентами, хуками и утилитами
- **API Layer**: Централизованные сервисы для работы с API
- **Custom Hooks**: Переиспользуемая логика в хуках
- **Path Aliases**: Удобные алиасы путей для импортов

### Backend

- **NestJS модули**: Каждая функциональность вынесена в отдельный модуль
- **Prisma ORM**: Типобезопасная работа с базой данных
- **JWT авторизация**: Безопасная аутентификация пользователей
- **Guards**: Защита маршрутов от неавторизованного доступа

## 📋 API Endpoints

### Auth
- \`POST /auth/register\` - Регистрация
- \`POST /auth/login\` - Вход
- \`POST /auth/profile\` - Получить профиль

### Users
- \`GET /users\` - Получить всех пользователей
- \`GET /users/:id\` - Получить пользователя
- \`PUT /users/:id\` - Обновить пользователя
- \`DELETE /users/:id\` - Удалить пользователя

### Courses
- \`GET /courses\` - Получить все курсы
- \`GET /courses/:id\` - Получить курс
- \`GET /courses/subject/:subject\` - Получить курс по предмету

## 🔒 Авторизация

Приложение использует JWT токены для авторизации. Токен сохраняется в localStorage и автоматически добавляется ко всем API запросам.

## 🚢 CI/CD

Проект настроен с GitHub Actions для автоматического:
- Линтинга кода
- Проверки типов
- Тестирования
- Деплоя на production

## 🤝 Участие в проекте

1. Создайте форк проекта
2. Создайте ветку для вашей функции (\`git checkout -b feature/AmazingFeature\`)
3. Закоммитьте изменения (\`git commit -m 'Add some AmazingFeature'\`)
4. Отправьте в ветку (\`git push origin feature/AmazingFeature\`)
5. Откройте Pull Request

## 📄 Лицензия

Этот проект лицензирован под MIT License.

## 👥 Авторы

- Разработчик
