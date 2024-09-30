export const subscribeToServiceWorkerUpdates = (callback) => {
    if ('serviceWorker' in navigator) {
        let messageHandler = (event) => {
            if (event.data.type === 'UPDATE_API_CACHE') {
                const url = new URL(event.data.url);
                callback(event, url);
            }
        };

        navigator.serviceWorker.ready.then(() => {

            navigator.serviceWorker.addEventListener('message', messageHandler);
        });

        return () => {
            navigator.serviceWorker.removeEventListener('message', messageHandler);
        };
    }
};
