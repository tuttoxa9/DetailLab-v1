# Detail Lab

Веб-приложение для управления автомойкой с интерфейсом в стиле macOS.

## Особенности

- ✨ Современный интерфейс в стиле macOS
- 🔐 Двухуровневая система аутентификации
- 📊 Ведение ежедневных отчетов
- 📅 Управление записями клиентов
- 📈 Аналитика и отчеты
- 📄 Экспорт в Word формат
- 🌙 Поддержка тем оформления
- 📱 Адаптивный дизайн

## Технологический стек

- **Framework**: Next.js 15
- **UI Library**: React 18 + shadcn/ui
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Styling**: Tailwind CSS
- **Package Manager**: Bun
- **TypeScript**: Полная типизация

## Быстрый старт

### Предварительные требования

- Node.js 18+ или Bun
- Firebase проект

### Установка

1. Клонируйте репозиторий:
```bash
git clone https://github.com/tuttoxa9/DetailLab-v1.git
cd DetailLab-v1
```

2. Установите зависимости:
```bash
bun install
```

3. Настройте переменные окружения:
```bash
cp .env.local.example .env.local
```

Заполните `.env.local` вашими Firebase конфигурациями:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

4. Запустите приложение:
```bash
bun dev
```

Приложение будет доступно по адресу `http://localhost:3000`

## Деплой

### Vercel (Рекомендуется)

1. Подключите репозиторий к Vercel
2. Настройте переменные окружения в панели Vercel
3. Деплой произойдет автоматически

### Netlify

```bash
bun run build
```

Загрузите папку `.next` в Netlify.

## Структура проекта

```
src/
├── app/                 # Next.js App Router
├── components/          # React компоненты
│   ├── pages/          # Страницы приложения
│   └── ui/             # UI компоненты (shadcn/ui)
├── lib/                # Утилиты и конфигурации
│   ├── firebase.ts     # Firebase конфигурация
│   ├── auth.ts         # Система аутентификации
│   └── export.ts       # Экспорт в Word
└── types/              # TypeScript типы
```

## Безопасность

- **Основная аутентификация**: Firebase Auth
- **Настройки**: Дополнительная защита паролем
- **Правила Firestore**: Настроенные правила безопасности

## Функциональность

### Ведомость ежедневная
- Отображение выполненных работ за день
- Подсчет выручки и зарплат
- Экспорт в Word формат

### Записи на мойку
- Управление предварительными записями
- Режимы просмотра: список и календарь
- Статусы записей

### Отчеты и аналитика
- Отчеты по выручке
- Анализ работы сотрудников
- Статистика по услугам

### Настройки
- Управление сотрудниками
- Настройка услуг
- Корпоративные клиенты
- Темы оформления

## Лицензия

Проект разработан для Detail Lab. Все права защищены.

## Поддержка

По вопросам обращайтесь к разработчику.
