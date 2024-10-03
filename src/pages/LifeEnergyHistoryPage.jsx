import React, {useEffect, useState} from 'react';
import {http} from "../core/http-common";
import LoadingIndicator from "../components/LoadingIndicator";
import LifeEnergyHistoryList from "../components/LifeEnergy/LifeEnergyHistoryList";
import classNames from "classnames";

const LifeEnergyHistoryPage = (className) => {
    document.title = "История изменения жизненной энергии";
    const [lifeEnergyHistory, setLifeEnergyHistory] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        http.get("/coinhistory?type=LifeEnergyBalance")
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
        http.delete("/coinhistory/" + item.id)
            .then(() => {
                console.log("success");
            })
            .catch(err => {
                console.log(err);
                alert(err.message);
            });
    }

    return (
        <div className={classNames(className, 'coin-history-container')}>
            <LoadingIndicator isLoading={isLoading}/>
            {!isLoading && lifeEnergyHistory &&
                <LifeEnergyHistoryList items={lifeEnergyHistory} onRevert={onRevert}>
                </LifeEnergyHistoryList>
            }
            <style jsx>{`
              .coin-history-container {
                align-items: center;
                align-content: center;
                flex-direction: column;
                height: 100%;
                width: 100%;
                padding: 20px;
              }
            `}</style>
        </div>
    );
};

export default LifeEnergyHistoryPage;
