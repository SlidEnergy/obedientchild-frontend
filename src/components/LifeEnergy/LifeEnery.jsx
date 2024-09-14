import React, {useEffect, useState} from 'react';
import {http} from "../../core/http-common";
import LoadingIndicator from "../LoadingIndicator";
import LifeEnergyPopup from "./LifeEnergyPopup";
import Battery from "./Battery";
import {useNavigate} from "react-router-dom";

const LifeEnergy = ({style}) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [isLifeEnergyPopupOpened, setIsLifeEnergyPopupOpened] = useState(false);
    const [lifeEnergyBalance, setLifeEnergyBalance] = useState(undefined);
    const [lifeEnergyPopupType, setLifeEnergyPopupType] = useState();

    useEffect(() => {
        loadAccount().then();
    }, []);

    async function loadAccount() {
        setIsLoading(true);

        try {
            let {data} = await http.get("lifeenergy");

            setLifeEnergyBalance(data.balance);
        } finally {
            setIsLoading(false);
        }
    }

    function powerUpClick() {
        setLifeEnergyPopupType("powerup");
        setIsLifeEnergyPopupOpened(true);
    }

    function powerDownClick() {
        setLifeEnergyPopupType("powerdown");
        setIsLifeEnergyPopupOpened(true);
    }

    async function powerUp(model) {
        setIsLoading(true);

        try {
            let {data} = await http.post("lifeenergy/powerup", model);

            setLifeEnergyBalance(lifeEnergyBalance + 1);
        } finally {
            setIsLoading(false);
        }
    }

    async function powerDown(model) {
        setIsLoading(true);

        try {
            let {data} = await http.post("lifeenergy/powerdown", model);

            setLifeEnergyBalance(lifeEnergyBalance - 1);
        } finally {
            setIsLoading(false);
        }
    }

    function closed(model) {
        setIsLifeEnergyPopupOpened(false);
        lifeEnergyPopupType == "powerup" ? powerUp(model) : powerDown(model)
    }

    function batteryClick() {
        navigate("lifeenergy/history");
    }

    return (
        <div style={style} className="battery-container">
            <LoadingIndicator isLoading={isLoading}></LoadingIndicator>
            {!isLoading &&
                <button className="battery-button btn btn-outline-primary"
                        onClick={powerDownClick}>-</button>
            }
            {!isLoading && lifeEnergyBalance !== undefined &&
                <Battery onClick={batteryClick} level={lifeEnergyBalance}></Battery>
            }
            {!isLoading &&
                <button className="battery-button btn btn-outline-primary"
                        onClick={powerUpClick}>+</button>
            }
            <LifeEnergyPopup onClosed={closed}
                             type={lifeEnergyPopupType}
                             isOpened={isLifeEnergyPopupOpened}>
            </LifeEnergyPopup>

            <style jsx="true">{`
              .battery-container {
                display: flex;
                align-items: center;
                gap: 20px; /* Отступы между элементами */
                margin-bottom: 1.5rem;
              }

              .battery-button {
                width: 38px;
              }
            `}</style>
        </div>
    );
};

export default LifeEnergy;
