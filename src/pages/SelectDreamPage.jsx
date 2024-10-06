import React, {useEffect, useState} from 'react';
import LoadingIndicator from "../components/LoadingIndicator";
import {useNavigate, useParams} from "react-router-dom";
import RewardList from "../components/RewardList";
import {api} from "../core/api";

const SelectDreamPage = () => {
    document.title = "Выбор мечты";

    const navigate = useNavigate();
    const {childId} = useParams();
    const [rewards, setRewards] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        api.get("/deeds?type=Reward")
            .then(({data}) => {
                setRewards(data);
            })
            .catch(err => {
                console.log(err);
                alert(err);
            })
            .finally(() => setIsLoading(false));
    }, []);

    function onChoose(item) {
        api.post(`/children/${childId}/setdream`, item.id)
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
        <div className='page-container'>
            <LoadingIndicator isLoading={isLoading}/>
            {!isLoading && <RewardList rewards={rewards} onChoose={onChoose}>
            </RewardList>}
            <style jsx>{`
              .page-container {
                align-items: center;
                align-content: center;
                flex-direction: column;
                height: 100%;
                width: 100%;
                padding: 0;
                margin: 1.5rem;
              }
            `}</style>
        </div>
    );
};

export default SelectDreamPage;
