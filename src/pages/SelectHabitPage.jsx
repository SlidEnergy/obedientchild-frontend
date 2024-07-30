import {useNavigate, useParams} from "react-router-dom";
import {http} from "../core/http-common";
import LoadingIndicator from "../components/LoadingIndicator";
import RewardList from "../components/RewardList";
import {useEffect, useState} from "react";

const SelectHabitPage = props => {
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
                alert("success");
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
            {!isLoading && <RewardList rewards={habits} onChoose={onChoose}>
            </RewardList>}
        </div>
    );
};

SelectHabitPage.propTypes = {

};

export default SelectHabitPage;
