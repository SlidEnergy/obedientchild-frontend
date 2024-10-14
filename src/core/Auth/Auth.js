import {getDbInstance} from "../DbContext";

const AUTH_STORE_NAME = 'auth';
const AUTH_ACCESS_TOKEN_KEY = 'accessToken';
const AUTH_REFRESH_TOKEN_KEY = 'refreshToken';

export const getAccessToken = async () => {
    try {
        const db = await getDbInstance();

        await db.get(AUTH_STORE_NAME, AUTH_ACCESS_TOKEN_KEY);
    } catch (err) {
        console.log(err);
        alert(err.message);
    }
};

export const setAuthTokens = async (token, refreshToken) => {
    try {
        const db = await getDbInstance();

        await db.put(AUTH_STORE_NAME, { key: AUTH_ACCESS_TOKEN_KEY, value: token});
        await db.put(AUTH_STORE_NAME, { key: AUTH_REFRESH_TOKEN_KEY, value: refreshToken});
    } catch (err) {
        console.log(err);
        alert(err.message);
    }
};

export const removeAuthTokens = async () => {
    try {
        const db = await getDbInstance();

        await db.delete(AUTH_STORE_NAME, AUTH_ACCESS_TOKEN_KEY);
        await db.delete(AUTH_STORE_NAME, AUTH_REFRESH_TOKEN_KEY);
    } catch (err) {
        console.log(err);
        alert(err.message);
    }
};
