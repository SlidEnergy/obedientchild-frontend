import { openDB } from 'idb';

const SETTINGS_STORE_NAME = 'settings';
const DAY_HABITS_STORE_NAME = 'dayHabits';
const AUTH_STORE_NAME = 'auth';
const DATABASE_NAME = 'app-db';
const DATABASE_VERSION = 2;

let dbInstance = null;

export const getDbInstance = async () => {
    if (!dbInstance) {
        dbInstance = await openDB(DATABASE_NAME, DATABASE_VERSION, {
            upgrade(db) {
                if (!db.objectStoreNames.contains(SETTINGS_STORE_NAME)) {
                    db.createObjectStore(SETTINGS_STORE_NAME, { keyPath: 'key' });
                }

                if (!db.objectStoreNames.contains(DAY_HABITS_STORE_NAME)) {
                    db.createObjectStore(DAY_HABITS_STORE_NAME, {autoIncrement: true});
                }

                if (!db.objectStoreNames.contains(AUTH_STORE_NAME)) {
                    db.createObjectStore(AUTH_STORE_NAME, { keyPath: 'key' });
                }
            },
        });

        dbInstance.onversionchange = () => {
            dbInstance.close();
            console.log('Database is closing due to version change');
        };
    } else if (dbInstance.closePending) {
        // Дождитесь завершения обновления
        await dbInstance.onversionchange;
    }
    return dbInstance;
};
