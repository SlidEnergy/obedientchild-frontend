import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {api} from "../core/api";
import LoadingIndicator from "../components/LoadingIndicator";
import CoinHistoryList from "../components/CoinHistory/CoinHistoryList";
import classNames from "classnames";

const CoinHistoryPage = (className) => {
    document.title = "История монет";
    const {childId} = useParams();
    const [coinHistory, setCoinHistory] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        api.get("/coinhistory?type=CoinBalance&childId=" + childId)
            .then(({data}) => {
                setCoinHistory(data.reverse());
            })
            .catch(err => {
                console.log(err);
                alert(err);
            })
            .finally(() => setIsLoading(false));
    }, []);

    function onRevert(item) {
        api.delete("/coinhistory/" + item.id)
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
            {!isLoading && coinHistory && <CoinHistoryList items={coinHistory} onRevert={onRevert}>
            </CoinHistoryList>}
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

export default CoinHistoryPage;
