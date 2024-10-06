import React, {useEffect, useState} from 'react';
import {api} from "../core/api";
import LoadingIndicator from "../components/LoadingIndicator";
import {useParams} from "react-router-dom";

const SettingsPage = () => {
    document.title = "Настройки";
    const [isLoading, setIsLoading] = useState(true);
    const [isApiKeyLoading, setIsApiKeyLoading] = useState(false);
    const [lifeEnergyAccount, setLifeEnergyAccount] = useState();
    const {googleAccessKey} = useParams();

    useEffect(() => {
        loadAccount().then();
    }, []);

    useEffect(() => {
        if (googleAccessKey)
            localStorage.setItem('googleAccessToken', googleAccessKey);
    }, [googleAccessKey]);

    async function loadAccount() {
        setIsLoading(true);

        try {
            let {data} = await api.get("lifeenergy");

            if (data)
                setLifeEnergyAccount(data);
        } finally {
            setIsLoading(false);
        }
    }

    async function getApiKey() {
        setIsApiKeyLoading(true);

        try {
            let {data} = await api.post("apikeys");

            return data;
        } finally {
            setIsApiKeyLoading(false);
        }
    }

    async function enableLifeEnergy() {
        setIsLoading(true);

        try {
            let {data} = await api.put("/lifeenergy");

            if (data)
                setLifeEnergyAccount(data);
        } finally {
            setIsLoading(false);
        }
    }

    async function openAuthUrl() {
        let apiKey = await getApiKey();

        let url = `${process.env.REACT_APP_BASE_API_URL}/api/v1/auth/google?api_key=` + apiKey;
        window.open(url, '_blank');
    }

    return (
        <div>
            <h2>Модуль Жизненная энергия</h2>
            <LoadingIndicator isLoading={isLoading}/>
            <div className='settings-content'>
                {!isLoading &&
                    <button className='button btn btn-outline-primary' onClick={enableLifeEnergy}
                            disabled={lifeEnergyAccount !== undefined}>Активировать</button>}
                <button className='button btn btn-outline-primary' onClick={openAuthUrl}
                        disabled={googleAccessKey !== undefined}>Авторизоваться в google
                </button>
            </div>
            <style jsx>{`
              .settings-content {
                display: flex;
                flex-direction: column;
                gap: 1.5rem;
                align-items: center;
              }

              .button {
                width: 300px;
              }
            `}</style>
        </div>
    );
};

export default SettingsPage;
