import React, {useEffect, useState} from 'react';
import LoadingIndicator from "../../components/LoadingIndicator";
import RewardList from "../../components/RewardList";
import {http} from "../../core/http-common";
import {useNavigate} from "react-router-dom";

const HabitsPage = () => {
    const navigate = useNavigate()
    const [habits, setHabits] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        http.get("/deeds?type=Habit")
            .then(({data}) => {
                setHabits(data);
            })
            .catch(err => {
                console.log(err);
                alert(err);
            })
            .finally(() => setIsLoading(false));
    }, []);

    function add() {
        navigate("/habits/add");
    }

    function onChoose(item) {
        navigate("/habits/" + item.id);
    }

    if (isLoading) {
        return <LoadingIndicator isLoading={isLoading}/>;
    }

    return (
        <div>
            <div style={{
                alignItems: "center",
                alignContent: "center",
                flexDirection: "column",
                height: "100%",
                width: "100%",
                padding: 20
            }}>
                <button style={{marginBottom: 20}} onClick={add}>Добавить</button>
                <LoadingIndicator isLoading={isLoading}/>
                <RewardList rewards={habits} onChoose={onChoose}>
                </RewardList>
            </div>
        </div>
    );
};

export default HabitsPage;
