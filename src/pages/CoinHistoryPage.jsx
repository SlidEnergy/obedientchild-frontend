import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {http} from "../core/http-common";
import LoadingIndicator from "../components/LoadingIndicator";
import CoinHistoryList from "../components/CoinHistory/CoinHistoryList";

const CoinHistoryPage = () => {
    document.title = "История монет";
    const {childId} = useParams();
    const [coinHistory, setCoinHistory] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        http.get("/coinhistory?childId=" + childId)
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
        http.delete("/coinhistory/" + item.id)
            .then(() => {
                alert("success");
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
            {!isLoading && <CoinHistoryList items={coinHistory} onRevert={onRevert}>
            </CoinHistoryList>}
        </div>
    );
};

export default CoinHistoryPage;
