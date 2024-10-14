/// <reference lib="webworker" />
/* eslint-disable no-restricted-globals */

import {registerRoute} from 'workbox-routing';
import {StaleWhileRevalidate} from 'workbox-strategies';
import {CacheFirst} from 'workbox-strategies';
import {ExpirationPlugin} from 'workbox-expiration';
import DayHabitsService from "./core/Domain/DayHabitsService";
import {precacheAndRoute} from 'workbox-precaching';

// Вставка Workbox манифеста
// eslint-disable-next-line no-restricted-globals
precacheAndRoute(self.__WB_MANIFEST);

// Кэширование запросов к API
registerRoute(
    ({event, url, request, sameOrigin}) =>
        url.pathname.startsWith('/api/v1') && !url.pathname.startsWith('/api/v1/token') && !url.pathname.startsWith('/api/v1/tasks') &&
        request.headers.get('Accept') && request.headers.get('Accept').includes('application/json'), // Фильтрация по Accept,
    async (options) => {
        try {
            let strategy = new StaleWhileRevalidate({
                cacheName: 'api-cache',
                plugins: [
                    {
                        // Плагин для уведомления о новых данных
                        fetchDidSucceed: async ({request, response}) => {
                            try {
                                if (!response.ok)
                                    return response;

                                // Проверка заголовка Content-Type
                                const contentType = response.headers.get('Content-Type');

                                // Если Content-Type не JSON, возвращаем null (или можем бросить ошибку)
                                if (!contentType || !contentType.includes('application/json')) {
                                    console.warn('Неподдерживаемый Content-Type: ' + contentType + ' url: ' + request.url);
                                    return response; // или return new Response('Unsupported format', { status: 415 });
                                }

                                const clonedResponse = response.clone();
                                const updatedResponse = await clonedResponse.json();

                                const cachedResponse = await caches.match(request);

                                if(!cachedResponse)
                                    return response;

                                let prevResponse = await cachedResponse.json();
                                if (!prevResponse || JSON.stringify(prevResponse) !== JSON.stringify(updatedResponse)) {
                                    // Если данные изменились, отправляем сообщение клиентам
                                    // eslint-disable-next-line no-restricted-globals
                                    self.clients.matchAll().then(clients => {
                                        clients.forEach(client => {
                                            client.postMessage({
                                                type: 'UPDATE_API_CACHE',
                                                response: updatedResponse,
                                                url: request.url
                                            });
                                        });
                                    });
                                }

                                return response;
                            } catch (error) {
                                console.error('Ошибка при обработке успешного запроса:', error);
                                return response;
                            }
                        },
                    },
                ],
            });

            return await strategy.handle(options);
        } catch (error) {
            console.error('Ошибка при обработке запроса:', error);
            // Возвращаем альтернативный ответ или кэшированный ответ
            return new Response('Сеть недоступна', {status: 503});
        }
    },
    "GET");

// Кэширование статических файлов (опционально)
registerRoute(
    ({request}) => request.destination === 'image',
    new CacheFirst({
        cacheName: 'image-cache',
        plugins: [
            new ExpirationPlugin({
                maxEntries: 50, // Максимальное количество изображений в кеше
                maxAgeSeconds: 30 * 24 * 60 * 60, // Срок жизни 30 дней
            }),
        ],
    })
);

const dayHabitService = new DayHabitsService();

self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-day-habits') {
        event.waitUntil(dayHabitService.syncCache());
    }
});

// В событии 'install' вызываем skipWaiting(), чтобы сразу перейти к активации
self.addEventListener('install', (event) => {
    if (!self.skipWaiting) {
        console.log('Устанавливается новый сервис-воркер...');

        event.waitUntil(Promise.resolve(self.skipWaiting()));
    }
});

// В событии 'activate' вызываем clients.claim(), чтобы новый воркер начал контролировать все вкладки
self.addEventListener('activate', (event) => {
    console.log('Новая версия сервис-воркера активирована.');

    const cacheWhitelist = ['image-cache', 'api-cache']; // укажите актуальные кэши
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );

    event.waitUntil(self.clients.claim().then(() => {
        console.log('Новая версия активна и управляет клиентами.');
    }));
});
