import {http} from "../http-common";
import store, {setChild, setChildren} from '../Store/store';

const get = async (url) => {
    try {
        let response = await http.get(url);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error(`Ошибка ${error.response.status}: ${error.response.statusText}`);
        } else {
            console.error(error);
        }
    }
}

const subscribeToServiceWorkerUpdates = (callback) => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(() => {
            navigator.serviceWorker.addEventListener('message', (event) => {
                if (event.data.type === 'UPDATE_API_CACHE') {
                    const url = new URL(event.data.url);
                    callback(event, url);
                }
            });
        });
    }
};

const childrenService = {
    async loadChildren() {
        let children = await get('/children');
        store.dispatch(setChildren(children));

        subscribeToServiceWorkerUpdates((event, url) => {
            if(url.pathname === '/api/v1/children')
                store.dispatch(setChildren(event.data.response));
        });

        return children;
    },
    async loadChild(id) {
        let child = await get(`/children/${id}`);
        store.dispatch(setChild(child));

        subscribeToServiceWorkerUpdates((event, url) => {
            const getChildApiRegex = /^\/api\/v1\/children\/[0-9]+$/;

            if(getChildApiRegex.test(url.pathname))
                store.dispatch(setChild(event.data.response));
        });

        return child;
    },
};

export default childrenService;
