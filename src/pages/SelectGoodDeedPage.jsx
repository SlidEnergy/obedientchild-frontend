import React, {useEffect, useState} from 'react';
import LoadingIndicator from "../components/LoadingIndicator";
import {useNavigate, useParams} from "react-router-dom";
import RewardList from "../components/RewardList";
import {http} from "../core/http-common";
import {toApiDateString} from "../utils/DateUtils";

const SelectGoodDeedPage = () => {
    document.title = "Выбор мечты";

    const navigate = useNavigate();
    const {childId} = useParams();
    const [goodDeeds, setGoodDeeds] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        http.get("/deeds?type=GoodDeed")
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
        http.put(`/childtasks/`, { childId, date: toApiDateString(new Date()), deedId: item.id})
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
            {!isLoading && <RewardList rewards={goodDeeds} onChoose={onChoose}>
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

export default SelectGoodDeedPage;
