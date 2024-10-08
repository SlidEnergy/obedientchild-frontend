import {api} from "../../core/api";

const GOOGLE_ACCESS_TOKEN_KEY = 'googleAccessToken';
const GOOGLE_REFRESH_TOKEN_KEY = 'googleRefreshToken';
const GOOGLE_EXPIRES_IN = 'googleExpiresIn';

export const refreshToken = async (token) => {
    let response = await api.post('/auth/google/refreshToken', { refreshToken: token });
    return response.data.accessToken
}

export const getGoogleAccessToken = () => {
    return localStorage.getItem(GOOGLE_ACCESS_TOKEN_KEY);
};

export const setGoogleAccessToken = (token) => {
    localStorage.setItem(GOOGLE_ACCESS_TOKEN_KEY, token);
};

export const getGoogleRefreshToken = () => {
    return localStorage.getItem(GOOGLE_REFRESH_TOKEN_KEY);
};

export const removeGoogleAuthTokens = () => {
    localStorage.removeItem(GOOGLE_ACCESS_TOKEN_KEY);
    localStorage.removeItem(GOOGLE_REFRESH_TOKEN_KEY);
    localStorage.removeItem(GOOGLE_EXPIRES_IN);
};

export const setGoogleAuthTokens = (accessToken, refreshToken, expiresIn) => {
    localStorage.setItem(GOOGLE_ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(GOOGLE_REFRESH_TOKEN_KEY, refreshToken);
    localStorage.setItem(GOOGLE_EXPIRES_IN, expiresIn);
}
