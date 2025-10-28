# Руководство по миграции на новую архитектуру

## 📌 Обзор изменений

Проект был перестроен под масштабируемую архитектуру с разделением frontend и backend.

### Структура изменений

#### Frontend
Старая структура:
```
src/
├── components/
├── pages/
├── utils/
├── data/
└── index.css
```

Новая структура:
```
src/
├── app/              # Входные файлы и роутинг
│   ├── components/   # Общие UI компоненты
│   └── pages/        # Страницы приложения
├── modules/          # Функциональные модули
│   ├── auth/
│   ├── courses/
│   └── profile/
├── hooks/            # Кастомные хуки
├── services/         # API сервисы
├── utils/            # Утилиты
└── styles/           # Глобальные стили
```

#### Backend
Новая структура:
```
server/
├── src/
│   ├── modules/      # NestJS модули
│   │   ├── auth/    # Авторизация
│   │   ├── users/   # Пользователи
│   │   └── courses/ # Курсы
│   └── common/       # Общие утилиты
└── prisma/          # Prisma схема БД
```

## 🔄 Пошаговая миграция

### 1. Установка зависимостей

```bash
# Установка frontend зависимостей
npm install

# Установка backend зависимостей
cd server
npm install
cd ..
```

### 2. Настройка переменных окружения

```bash
cp .env.example .env
```

Отредактируйте `.env` файл:
- Укажите URL вашей PostgreSQL базы данных
- Настройте JWT_SECRET
- Настройте API URL для frontend

### 3. Настройка базы данных

```bash
cd server

# Примените миграции
npx prisma migrate dev

# Сгенерируйте Prisma Client
npx prisma generate
```

### 4. Настройка Husky (git hooks)

```bash
npm run prepare
```

### 5. Запуск приложения

#### Development режим

**Terminal 1 - Backend:**
```bash
cd server
npm run start:dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

## 📝 Изменения в коде

### Path Aliases

Используйте новые алиасы путей:

```javascript
// Старый способ
import { authService } from '../../../services/auth.service'

// Новый способ
import { authService } from '@services/auth.service'
```

Доступные алиасы:
- `@/*` - `./src/*`
- `@app/*` - `./src/app/*`
- `@modules/*` - `./src/modules/*`
- `@hooks/*` - `./src/hooks/*`
- `@services/*` - `./src/services/*`
- `@utils/*` - `./src/utils/*`
- `@styles/*` - `./src/styles/*`

### API Services

Для работы с API используйте централизованные сервисы:

```javascript
import { authService } from '@services/auth.service'
import { coursesService } from '@services/courses.service'
import { usersService } from '@services/users.service'

// Вместо прямых axios запросов
const data = await coursesService.getAll()
```

### Custom Hooks

Используйте новые хуки для общей логики:

```javascript
import { useAuth } from '@hooks/useAuth'
import { useApi } from '@hooks/useApi'

function MyComponent() {
  const { user, login, logout } = useAuth()
  const { data, loading, error } = useApi(() => coursesService.getAll())
  // ...
}
```

## ⚠️ Важные заметки

1. **Временная совместимость**: Старый код остался в `src/components/`, `src/pages/` и т.д. Он будет работать, но рекомендуется постепенно мигрировать на новую структуру.

2. **UserStore**: Временный userStore остался в `src/utils/userStore.js` для обратной совместимости. В будущем он будет заменен на API вызовы.

3. **Data files**: Файлы `src/data/` пока используются для mock данных. После подключения backend они будут удалены.

4. **TypeScript**: Проект настроен на TypeScript, но текущие файлы остались на JavaScript для плавной миграции.

## 🔮 Планы развития

1. Постепенная миграция компонентов в модульную структуру
2. Полная интеграция с backend API
3. Добавление TypeScript для всех файлов
4. Добавление тестов для основных компонентов
5. Оптимизация bundle size и производительности

## 📚 Дополнительная информация

Подробные инструкции по разработке:
- Frontend: см. `README.md`
- Backend: см. `server/README.md`

