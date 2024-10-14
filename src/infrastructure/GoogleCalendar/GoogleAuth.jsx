import React, {createContext, useContext, useState} from 'react';
import {api} from "../../core/api";
import {getAccessToken} from "../../core/Auth/Auth";
import {removeGoogleAuthTokens, setGoogleAuthTokens} from "./GoogleAuthUtils";

const GoogleAuthContext = createContext({
    isAuthenticated: false,
    signInGoogle: () => {
    },
    logout: () => {
    },
    refreshIsAuthenticated: () => {
        console.log('empty')
    },
    callback: () => {

    }
});

export const GoogleAuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const signInGoogle = async (email, password) => {
        try {
            let {data: apiKey} = await api.post("apikeys");

            let url = `${process.env.REACT_APP_BASE_API_URL}/api/v1/auth/google?api_key=` + apiKey;
            window.open(url, '_blank');
        } catch (err) {
            console.error('Ошибка при логине', err);
            throw new Error(err.message);
        }
    };

    const logout = () => {
        clearAuth();
    };

    const clearAuth = () => {
        removeGoogleAuthTokens();
        setIsAuthenticated(false); // Обновить состояние
    };

    const validateToken = async (token) => {
        return true;
    }

    const refreshIsAuthenticated = async () => {
        const token = await getAccessToken();

        if (token) {
            const isValid = await validateToken(token);

            setIsAuthenticated(isValid);

            if (isValid === false)
                clearAuth();

            return isValid;
        }

        return false;
    }

    const callback = async (accessToken, refreshToken, expiresIn) => {
        setGoogleAuthTokens(accessToken, refreshToken, expiresIn);

        // const refreshTokenTimer = setTimeout(() => {
        //     // Логика обновления токена
        //     let token = localStorage.getItem('googleRefreshToken');
        //     refreshToken(token);
        // }, expiresIn - 60000); // Обновить за 1 минуту до истечения
        //
        // clearTimeout(refreshTokenTimer);
    }

    return (
        <GoogleAuthContext.Provider
            value={{isAuthenticated, signInGoogle, logout, refreshIsAuthenticated, callback}}>
            {children}
        </GoogleAuthContext.Provider>
    );
};

export const useGoogleAuth = () => useContext(GoogleAuthContext);
