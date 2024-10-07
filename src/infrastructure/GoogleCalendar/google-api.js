import axios from "axios";
import {getGoogleAccessToken, getGoogleRefreshToken, refreshToken, setGoogleAccessToken} from "./GoogleAuthUtils";

export const googleApi = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_API_URL}/api/v1`,
    headers : {
        'content-type': 'application/json'
    }
})

// Добавляем интерсептор для автоматического добавления токена к каждому запросу
googleApi.interceptors.request.use(
    (config) => {
        // Получаем токен из localStorage
        const token = getGoogleAccessToken();

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
googleApi.interceptors.response.use((response) => {
    response.data = convertDates(response.data);
    return response;
}, (error) => {
    return Promise.reject(error);
});


googleApi.interceptors.response.use(
    response => response,
    async (error) => {
        if (error.response.status === 401) {
            // Попытка обновить токен с использованием рефреш токена
            const token = getGoogleRefreshToken();
            try {
                const token = await refreshToken(token);
                setGoogleAccessToken(token);
                // Повторяем изначальный запрос с новым токеном
                error.config.headers.Authorization = `Bearer ${token}`;
                return axios(error.config);
            } catch (refreshError) {
                // Если обновление токена не удалось, перенаправляем на страницу логина
                console.error('Failed to refresh token', refreshError);
            }
        }
        return Promise.reject(error);
    }
);
