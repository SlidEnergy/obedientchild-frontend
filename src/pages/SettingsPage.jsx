import React, {useEffect, useState} from 'react';
import {http} from "../core/http-common";
import LoadingIndicator from "../components/LoadingIndicator";

const SettingsPage = () => {
    document.title = "Настройки";
    const [isLoading, setIsLoading] = useState(true);
    const [lifeEnergyAccount, setLifeEnergyAccount] = useState();

    useEffect(() => {
        loadAccount()
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

    return (
        <div>
            <h2>Модуль Жизненная энергия</h2>
            <LoadingIndicator isLoading={isLoading}></LoadingIndicator>
            {!isLoading &&
                <button onClick={enableLifeEnergy} disabled={lifeEnergyAccount != undefined}>Активировать</button>}
        </div>
    );
};

export default SettingsPage;
