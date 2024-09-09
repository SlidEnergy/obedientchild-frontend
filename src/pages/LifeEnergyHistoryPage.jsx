import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {http} from "../core/http-common";
import LoadingIndicator from "../components/LoadingIndicator";
import CoinHistoryList from "../components/CoinHistory/CoinHistoryList";
import LifeEnergyHistoryList from "../components/LifeEnergy/LifeEnergyHistoryList";

const LifeEnergyHistoryPage = () => {
    document.title = "История изменения жизненной энергии";
    const [lifeEnergyHistory, setLifeEnergyHistory] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        http.get("/lifeenergy/history")
            .then(({data}) => {
                setLifeEnergyHistory(data.reverse());
            })
            .catch(err => {
                console.log(err);
                alert(err);
            })
            .finally(() => setIsLoading(false));
    }, []);

    function onRevert(item) {
        http.delete("/lifeenergy/history" + item.id)
            .then(() => {
                console.log("success");
            })
            .catch(err => {
                console.log(err);
                alert(err.message);
            });
    }

    return (
        <div style={{
            alignItems: "center",
            alignContent: "center",
            flexDirection: "column",
            height: "100%",
            width: "100%",
            padding: 20
        }}>
            <LoadingIndicator isLoading={isLoading}></LoadingIndicator>
            {!isLoading &&
                <LifeEnergyHistoryList items={lifeEnergyHistory} onRevert={onRevert}>
                </LifeEnergyHistoryList>
            }
        </div>
    );
};

export default LifeEnergyHistoryPage;
