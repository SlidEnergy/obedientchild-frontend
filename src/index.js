import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {AuthProvider} from "./core/Auth/AuthContext";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

serviceWorkerRegistration.register();

if ('SyncManager' in window) {
    // Регистрация сервис-воркера
    navigator.serviceWorker.ready.then((registration) => {
        // Регистрация задачи синхронизации
        return registration.sync.register('sync-day-habits');
    }).catch((error) => {
        console.error('Ошибка при регистрации:', error);
    });
} else {
    console.warn('Синхронизация не поддерживаются вашим браузером.');
}

// Устанавливаем флаг в локальном хранилище при перезагрузке
window.addEventListener('beforeunload', () => {
    localStorage.setItem('isForcedReload', 'true');
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <App/>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
