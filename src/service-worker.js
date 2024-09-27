import {registerRoute} from 'workbox-routing';
import {StaleWhileRevalidate} from 'workbox-strategies';
import {CacheFirst} from 'workbox-strategies';
import {ExpirationPlugin} from 'workbox-expiration';
import DayHabitsService from "./core/Domain/day-habits-service";
import {precacheAndRoute} from 'workbox-precaching';

// Вставка Workbox манифеста
// eslint-disable-next-line no-restricted-globals
precacheAndRoute(self.__WB_MANIFEST);

// Кэширование запросов к API
registerRoute(
    ({url, request}) => url.pathname.startsWith('/api/v1') && request.method === 'GET',
    new StaleWhileRevalidate({
        cacheName: 'api-children-cache',
        plugins: [
            {
                // Плагин для уведомления о новых данных
                fetchDidSucceed: async ({request, response}) => {
                    if (!response.ok)
                        return response;

                    const url = new URL(request.url);
                    if (url.pathname === '/api/v1/children') {
                        const clonedResponse = response.clone();
                        const updatedChildren = await clonedResponse.json();

                        /// Здесь вы можете добавить логику для проверки изменения данных
                        const previousChildren = await caches.match(request);
                        if (!previousChildren || JSON.stringify(previousChildren) !== JSON.stringify(updatedChildren)) {
                            // Если данные изменились, отправляем сообщение клиентам
                            // eslint-disable-next-line no-restricted-globals
                            self.clients.matchAll().then(clients => {
                                clients.forEach(client => {
                                    client.postMessage({
                                        type: 'UPDATE_CHILDREN',
                                        data: updatedChildren
                                    });
                                });
                            });
                        }
                    }

                    return response;
                },
            },
        ],
    })
);

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

// eslint-disable-next-line no-restricted-globals
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-day-habits') {
        event.waitUntil(dayHabitService.syncCache());
    }
});
