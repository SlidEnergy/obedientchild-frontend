import React, {useEffect, useState} from 'react';
import LoadingIndicator from "../components/LoadingIndicator";
import {useNavigate, useParams} from "react-router-dom";
import RewardList from "../components/RewardList";
import {http} from "../core/http-common";
import {toApiDateString} from "../utils/DateUtils";

const SelectGoodDeedPage = props => {
    document.title = "Выбор мечты";

    const navigate = useNavigate();
    const {childId} = useParams();
    const [goodDeeds, setGoodDeeds] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        http.get("/gooddeeds")
            .then(({data}) => {
                setGoodDeeds(data);
            })
            .catch(err => {
                console.log(err);
                alert(err);
            })
            .finally(() => setIsLoading(false));
    }, []);

    function onChoose(item) {
        http.put(`/childtasks/`, { childId, date: toApiDateString(new Date()), goodDeedId: item.id})
            .then(({data}) => {
                console.log("success");
                navigate("/children/" + childId);
            })
            .catch(err => {
                console.log(err);
                alert(err);
            });
    }

    return (
        <div style={{
            alignItems: "center",
            alignContent: "center",
            flexDirection: "column",
            height: "100%",
            width: "100%",
            padding: 0
        }}>
            <LoadingIndicator isLoading={isLoading}></LoadingIndicator>
            {!isLoading && <RewardList rewards={goodDeeds} onChoose={onChoose}>
            </RewardList>}
        </div>
    );
};

SelectGoodDeedPage.propTypes = {

};

export default SelectGoodDeedPage;
