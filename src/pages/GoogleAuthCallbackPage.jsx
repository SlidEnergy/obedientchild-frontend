import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import {useGoogleAuth} from "../infrastructure/GoogleCalendar/GoogleAuth";

const GoogleAuthCallbackPage = () => {
    document.title = "Настройки";
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const googleAccessToken = queryParams.get('googleAccessToken');
    const googleRefreshToken = queryParams.get('googleRefreshToken');
    const expiresIn = queryParams.get('expiresIn');

    const {callback} = useGoogleAuth();

    useEffect(() => {
        if (googleAccessToken && googleRefreshToken && expiresIn) {
            callback(googleAccessToken, googleRefreshToken, expiresIn);

            window.close();
        }
    }, [googleAccessToken, googleRefreshToken, expiresIn]);

    return (
        <div>
            <style jsx>{`

            `}</style>
        </div>
    );
};

export default GoogleAuthCallbackPage;
