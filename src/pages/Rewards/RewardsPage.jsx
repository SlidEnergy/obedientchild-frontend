import React, {useEffect, useState} from 'react';
import ChildList from "../../components/ChildList";
import {http} from "../../core/http-common";
import RewardList from "../../components/RewardList";
import LoadingIndicator from "../../components/LoadingIndicator";
import {useNavigate} from "react-router-dom";

const RewardsPage = () => {
    document.title = "Награды";

    const navigate = useNavigate();
    const [rewards, setRewards] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        http.get("/deeds?type=Reward")
            .then(({data}) => {
                setRewards(data);
            })
            .catch(err => {
                console.log(err);
                alert(err);
            })
            .finally(() => setIsLoading(false));
    }, []);

    function addReward() {
        navigate("/rewards/add");
    }

    function onChoose(item) {
        navigate("/rewards/" + item.id);
    }

    if (isLoading) {
        return <LoadingIndicator isLoading={isLoading}></LoadingIndicator>;
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
            <button style={{marginBottom: 20}} onClick={addReward}>Добавить</button>
            <LoadingIndicator isLoading={isLoading}></LoadingIndicator>
            {!isLoading && <RewardList rewards={rewards} onChoose={onChoose}>
            </RewardList>}
        </div>
    );
};

export default RewardsPage;
