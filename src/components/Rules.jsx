import {http} from "../core/http-common";
import LoadingIndicator from "./LoadingIndicator";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import RuleList from "./RuleList";

const Rules = () => {
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
            {badDeeds && <RuleList rewards={badDeeds} onChoose={(reward) => spendCoin(reward)}>
            </RuleList>}
            <style jsx>{`
              .rule-list {
                flex-direction: column;
                height: 100%;
                width: 100%;
                display: flex;
                margin-top: 1.5rem;
              }
            `}</style>
        </div>
    );
};

export default Rules;
