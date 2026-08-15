const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { userIdentify } = require('./middleware/auth');
const apiRouter = require('./routes/api.js');
const { sequelize } = require('./models');

const PORT = process.env.BACKEND_PORT || 3009;
const app = express();

// Парсинг JSON
app.use(express.json());

// CORS для разработки
app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true
}));

// Определяем пользователя
app.use(userIdentify);

// Раздача загруженных файлов (картинки товаров/категорий)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API маршруты
app.use('/api', apiRouter);

// В продакшене раздаем статику фронтенда
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
    });
}

async function start() {
    try {
        await sequelize.authenticate();
        console.log('✅ Подключение к БД успешно');
        await sequelize.sync();
        console.log('✅ Синхронизация таблиц БД успешна');
    } catch (e) {
        console.log('❌ Ошибка подключения к БД:', e.message);
    }
    
    app.listen(PORT, () => {
        console.log(`🚀 Сервер запущен на порту ${PORT}`);
        console.log(`📡 API доступно по адресу http://localhost:${PORT}/api`);
        console.log(`🖥️  Фронтенд в режиме разработки: http://localhost:5173`);
    });
}

start();
