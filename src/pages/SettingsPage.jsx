import React, {useEffect, useState} from 'react';
import {http} from "../core/http-common";
import LoadingIndicator from "../components/LoadingIndicator";

const SettingsPage = () => {
    document.title = "Настройки";
    const [isLoading, setIsLoading] = useState(true);
    const [lifeEnergyAccount, setLifeEnergyAccount] = useState();

    useEffect(() => {
        loadAccount().then();
    }, []);

    async function loadAccount() {
        setIsLoading(true);

        try {
            let {data} = await http.get("lifeenergy");

            if (data)
                setLifeEnergyAccount(data);
        } finally {
            setIsLoading(false);
        }
    }

    async function enableLifeEnergy() {
        setIsLoading(true);

        try {
            let {data} = await http.put("/lifeenergy");

            if (data)
                setLifeEnergyAccount(data);
        } finally {
            setIsLoading(false);
        }
    }

    async function openAuthUrl() {
        let url = "https://edemvgelen.ru:4001/api/v1/auth/google";
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
                <button className='button btn btn-outline-primary' onClick={openAuthUrl}>Авторизоваться в google
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
