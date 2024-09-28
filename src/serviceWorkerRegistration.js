const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
    // [::1] — это IPv6 localhost адрес.
    window.location.hostname === '[::1]' ||
    // 127.0.0.0/8 считает IPv4 localhost для всех адресов 127.0.0.1 до 127.255.255.255.
    window.location.hostname.match(
        /^127(?:\.\d{1,3}){3}$/
    )
);

export function register(config) {
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
        const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
        if (publicUrl.origin !== window.location.origin) {
            return;
        }

        //window.addEventListener('load', () => {
            const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

            if (isLocalhost) {
                // В режиме localhost проверяем, работает ли сервис-воркер
                checkValidServiceWorker(swUrl, config);
            } else {
                // Регистрируем сервис-воркер в production-режиме
                registerValidSW(swUrl, config);
            }
        //});
    }
}

function registerValidSW(swUrl, config) {
    navigator.serviceWorker
        .register(swUrl)
        .then((registration) => {
            // Успешная регистрация
            console.log('Service Worker зарегистрирован:', registration);

            // Проверяем, если обновление воркера найдено
            registration.onupdatefound = () => {
                const installingWorker = registration.installing;
                if (installingWorker == null) {
                    return;
                }

                installingWorker.onstatechange = () => {
                    if (installingWorker.state === 'installed') {
                        if (navigator.serviceWorker.controller) {
                            // Показываем уведомление об обновлении контента
                            console.log('New content is available and will be used when all tabs for this page are closed.');

                            // Выполняем callback из конфигурации
                            if (config && config.onUpdate) {
                                config.onUpdate(registration);
                            }
                        } else {
                            // Показываем уведомление, что контент закеширован для оффлайн-режима
                            console.log('Content is cached for offline use.');

                            // Выполняем callback из конфигурации
                            if (config && config.onSuccess) {
                                config.onSuccess(registration);
                            }
                        }
                    }
                };
            };
        })
        .catch((error) => {
            console.error('Ошибка при регистрации Service Worker:', error);
        });
}

function checkValidServiceWorker(swUrl, config) {
    // Проверяем, существует ли сервис-воркер по указанному пути
    fetch(swUrl, {
        headers: { 'Service-Worker': 'script' },
    })
        .then((response) => {
            // Проверяем, что сервис-воркер существует, и что он не является HTML-страницей
            const contentType = response.headers.get('content-type');
            if (
                response.status === 404 ||
                (contentType != null && contentType.indexOf('javascript') === -1)
            ) {
                // Если сервис-воркер не найден, удаляем существующий
                navigator.serviceWorker.ready.then((registration) => {
                    registration.unregister().then(() => {
                        window.location.reload();
                    });
                });
            } else {
                // Если всё в порядке, регистрируем воркер
                registerValidSW(swUrl, config);
            }
        })
        .catch(() => {
            console.log('Нет подключения к интернету. Приложение работает в оффлайн-режиме.');
        });
}
