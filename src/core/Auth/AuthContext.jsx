import React, {createContext, useContext, useState} from 'react';
import {api} from "../api";
import {getAccessToken, removeAuthTokens, setAuthTokens} from "./Auth";

const AuthContext = createContext({
    isAuthenticated: false,
    login: () => {
    },
    logout: () => {
    },
    refreshIsAuthenticated: () => {
        console.log('empty')
    }
});

export const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(undefined);

    const login = async (email, password) => {
        try {
            const response = await api.post('/token', {
                email,
                password,
            });

            // Сохраняем токены в localStorage
            const {token, refreshToken} = response.data;

            await setAuthTokens(token, refreshToken);

            setIsAuthenticated(true);
            setUser({email});
        } catch (err) {
            console.error('Ошибка при логине', err);
            throw new Error(err.message);
        }
    };

    const logout = async () => {
        await clearAuth();
    };

    const clearAuth = async () => {
        await removeAuthTokens();
        setIsAuthenticated(false); // Обновить состояние
        setUser(undefined); // Обновить состояние
    };

    const validateToken = async (token) => {
        try {
            const response = await api.get('/token/validate', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return response.status === 200; // Токен валиден, если статус 200
        } catch (error) {
            if (error.code === 403) {
                console.error("Token isn't valid");
                return false
            }

            console.error('Error validating token:', error);
            return undefined;
        }
    }

    const refreshIsAuthenticated = async () => {
        let token = await getAccessToken();

        if (token) {
            const isValid = await validateToken(token);

            setIsAuthenticated(isValid);

            if (isValid === false)
                await clearAuth();

            return isValid;
        }

        return false;
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout, user, refreshIsAuthenticated}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
