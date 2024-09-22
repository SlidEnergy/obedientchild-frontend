import React, {createContext, useContext, useEffect, useState} from 'react';
import {http} from "../http-common";
import {getAuthToken, removeAuthToken, setAuthToken} from "./AuthUtils";
import {useParams} from "react-router-dom";

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
            const response = await http.post('/token', {
                email,
                password,
            });

            // Сохраняем токены в localStorage
            const {token, refreshToken} = response.data;
            setAuthToken(token);
            localStorage.setItem('refreshToken', refreshToken);

            setIsAuthenticated(true);
            setUser({email});
        } catch (err) {
            console.error('Ошибка при логине', err);
            throw new Error(err.message);
        }
    };

    const logout = () => {
        clearAuth();
    };

    const clearAuth = () => {
        removeAuthToken();
        localStorage.removeItem('refreshToken')
        setIsAuthenticated(false); // Обновить состояние
        setUser(undefined); // Обновить состояние
    };

    const validateToken = async (token) => {
        try {
            const response = await http.get('/token/validate', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return response.status === 200; // Токен валиден, если статус 200
        } catch (error) {
            console.error('Error validating token:', error);
            return false; // Токен не валиден или ошибка
        }
    }

    const refreshIsAuthenticated = async () => {
        const token = getAuthToken();

        if (token) {
            const isValid = await validateToken(token);

            setIsAuthenticated(isValid);

            console.log(isValid)
            if (!isValid)
                clearAuth();

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
