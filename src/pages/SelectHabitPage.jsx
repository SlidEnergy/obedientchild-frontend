import {useNavigate, useParams} from "react-router-dom";
import {http} from "../core/http-common";
import LoadingIndicator from "../components/LoadingIndicator";
import RewardList from "../components/RewardList";
import {useEffect, useState} from "react";

const SelectHabitPage = () => {
    document.title = "Выбор привычки";

    const navigate = useNavigate();
    const {childId} = useParams();
    const [habits, setHabits] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        http.get("/habits")
            .then(({data}) => {
                setHabits(data);
            })
            .catch(err => {
                console.log(err);
                alert(err);
            })
            .finally(() => setIsLoading(false));
    }, []);

    function onChoose(item) {
        http.post(`/habits/${item.id}/child/${childId}`, undefined)
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
            {!isLoading && <RewardList rewards={habits} onChoose={onChoose}>
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

SelectHabitPage.propTypes = {

};

export default SelectHabitPage;
