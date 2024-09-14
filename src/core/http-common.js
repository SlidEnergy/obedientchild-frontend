import axios from "axios";
import {getAuthToken} from "./Auth/AuthUtils";

export const http = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_API_URL}/api/v1`,
    headers : {
        'content-type': 'application/json'
    }
})

// Добавляем интерсептор для автоматического добавления токена к каждому запросу
http.interceptors.request.use(
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
