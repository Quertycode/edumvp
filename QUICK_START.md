# Быстрый старт

## 🚀 Запуск проекта за 5 минут

### 1. Установка зависимостей

```bash
npm install
cd server && npm install && cd ..
```

### 2. Настройка окружения

Создайте файл `.env`:

```env
VITE_API_URL=http://localhost:3001
PORT=3001
DATABASE_URL=postgresql://user:password@localhost:5432/edumvp
JWT_SECRET=your-secret-key
```

### 3. Настройка базы данных

```bash
cd server
npx prisma migrate dev
npx prisma generate
cd ..
```

### 4. Запуск

**В первом терминале:**
```bash
cd server
npm run start:dev
```

**Во втором терминале:**
```bash
npm run dev
```

✅ Готово! Откройте http://localhost:5173

