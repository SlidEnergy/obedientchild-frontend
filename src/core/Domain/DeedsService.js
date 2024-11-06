import {api} from "../api";

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

const DeedsService = {
    async loadDeeds(types) {
        let result = await get(`/deeds?type=${types.join('&type=')}`);

        return result;
    },
};

export default DeedsService;
