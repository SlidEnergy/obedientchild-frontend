import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {http} from "../../core/http-common";
import LoadingIndicator from "../LoadingIndicator";
import LifeEnergyPopup from "./LifeEnergyPopup";
import Battery from "./Battery";
import {useNavigate} from "react-router-dom";

const LifeEnergy = props => {
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

            console.log(data)
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
        <div style={{...props.style, ...{display: 'flex', alignItems: 'center', gap: '10px'}}}>
            <LoadingIndicator isLoading={isLoading}></LoadingIndicator>
            {!isLoading &&
                <button style={{marginRight: 20}} onClick={powerDownClick}>-</button>
            }
            {!isLoading && lifeEnergyBalance !== undefined &&
                <Battery onClick={batteryClick} level={lifeEnergyBalance}></Battery>
            }
            {!isLoading &&
                <button style={{marginLeft: 20}} onClick={powerUpClick}>+</button>
            }
            <LifeEnergyPopup onClosed={closed}
                             type={lifeEnergyPopupType}
                             isOpened={isLifeEnergyPopupOpened}>
            </LifeEnergyPopup>
        </div>
    );
};

LifeEnergy.propTypes = {
    count: PropTypes.number,
    size: PropTypes.number
};

export default LifeEnergy;
