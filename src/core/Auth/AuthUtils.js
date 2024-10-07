const ACCESS_TOKEN = 'token';
const REFRESH_TOKEN = 'refreshToken';

export const getAccessToken = () => {
    return localStorage.getItem(ACCESS_TOKEN);
};

export const setAuthTokens = (token, refreshToken) => {
    localStorage.setItem(ACCESS_TOKEN, token);
    localStorage.setItem(REFRESH_TOKEN, refreshToken);
};

export const removeAuthTokens = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
};
