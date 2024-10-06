import axios from "axios";
import {getAuthToken} from "./Auth/AuthUtils";

export const api = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_API_URL}/api/v1`,
    headers : {
        'content-type': 'application/json'
    }
})

// Добавляем интерсептор для автоматического добавления токена к каждому запросу
api.interceptors.request.use(
    (config) => {
        // Получаем токен из localStorage
        const token = getAuthToken();

        // Если токен существует, добавляем его в заголовки
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        // Обрабатываем ошибку перед отправкой запроса
        return Promise.reject(error);
    }
);

// Функция проверки строки на формат даты
const isDateString = (value) => {
    // Расширенное регулярное выражение для ISO формата с временем и просто датой
    const dateRegex = /^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z)?$/;
    return typeof value === 'string' && dateRegex.test(value);
};

const convertDates = (obj) => {
    if (Array.isArray(obj)) {
        return obj.map(item => convertDates(item));
    } else if (obj !== null && typeof obj === 'object') {
        return Object.keys(obj).reduce((acc, key) => {
            acc[key] = convertDates(obj[key]);
            return acc;
        }, {});
    } else if (isDateString(obj)) {
        return new Date(obj);
    }
    return obj;
};

// Интерсептор для преобразования дат
api.interceptors.response.use((response) => {
    response.data = convertDates(response.data);
    return response;
}, (error) => {
    return Promise.reject(error);
});

