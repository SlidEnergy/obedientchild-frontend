import {http} from "../core/http-common";
import LoadingIndicator from "./LoadingIndicator";
import RewardList from "./RewardList";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

const RuleList = () => {
    const [badDeeds, setBadDeeds] = useState();
    const [isLoading, setIsLoading] = useState(true);
    let {childId} = useParams();

    useEffect(() => {
        setIsLoading(true);
        http.get("/baddeeds")
            .then(({data}) => {
                setBadDeeds(data);
            })
            .catch(err => {
                console.log(err);
                alert(err);
            })
            .finally(() => setIsLoading(false));
    }, []);

    function spendCoin(reward) {
        http.put("/children/" + childId + "/spend/", reward)
            .then(({data}) => {
            })
            .catch(err => {
                console.log(err);
                alert(err.message);
            });
    }

    return (
        <div className='rule-list'>
            <h3>Правила</h3>
            <LoadingIndicator isLoading={isLoading}/>
            {badDeeds && <RewardList rewards={badDeeds} onChoose={(reward) => spendCoin(reward)}>
            </RewardList>}
            <style jsx>{`
              .rule-list {
                 align-items: center;
                align-content: center;
                flex-direction: column;
                height: 100%;
                width: 100%;
                padding: 20px;
                display: flex;
              }
            `}</style>
        </div>
    );
};

export default RuleList;
