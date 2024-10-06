import {useNavigate, useParams} from "react-router-dom";
import {api} from "../core/api";
import LoadingIndicator from "../components/LoadingIndicator";
import RewardList from "../components/RewardList";
import {useEffect, useState} from "react";

const SelectGoalPage = props => {
    document.title = "Выбор цели";

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
        api.post(`/children/${childId}/setgoal`, item.id)
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

export default SelectGoalPage;
