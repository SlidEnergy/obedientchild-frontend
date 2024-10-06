import {api} from "../api";
import store, {setChild, setChildren} from '../Store/store';
import {subscribeToServiceWorkerUpdates} from "./subscribeToServiceWorkerUpdates";

const get = async (url) => {
    try {
        let response = await api.get(url);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error(`Ошибка ${error.response.status}: ${error.response.statusText}`);
        } else {
            console.error(error);
        }
    }
}

const childrenService = {
    subscribe(){
        return subscribeToServiceWorkerUpdates((event, url) => {
            if(url.pathname === '/api/v1/children')
                store.dispatch(setChildren(event.data.response));

            const getChildApiRegex = /^\/api\/v1\/children\/[0-9]+$/;

            if(getChildApiRegex.test(url.pathname))
                store.dispatch(setChild(event.data.response));
        });
    },
    async loadChildren() {
        let children = await get('/children');
        store.dispatch(setChildren(children));

        return children;
    },
    async loadChild(id) {
        let child = await get(`/children/${id}`);
        store.dispatch(setChild(child));

        return child;
    },
};

export default childrenService;
