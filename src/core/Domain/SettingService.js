import {openDB} from 'idb';
import {getDbInstance} from "../DbContext";

const SETTINGS_STORE_NAME = 'settings';

class SettingService {
    async get(key) {
        try {
            const db = await getDbInstance();

            const setting = await db.get(SETTINGS_STORE_NAME, key);
            return setting.value;
        } catch (err) {
            console.log(err);
        }
    }

    async delete(key) {
        try {
            const db = await getDbInstance();

            await db.delete(SETTINGS_STORE_NAME, key);
        } catch (err) {
            console.log(err);
        }
    }

    async set(key, value) {
        try {
            const db = await getDbInstance();

            await db.put(SETTINGS_STORE_NAME, {key,value});
        } catch (err) {
            console.log(err);
            alert(err.message);
        }
    }
}

export default SettingService;
