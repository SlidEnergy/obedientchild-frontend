import React, {useEffect, useState, useRef} from 'react';
import HabitList from "./HabitList";
import {http} from "../../core/http-common";
import {useNavigate, useParams} from "react-router-dom";
import LoadingIndicator from "../LoadingIndicator";
import HabitsPeriodLine from "./HabitsPeriodLine";

const ChildHabits = props => {
    let navigate = useNavigate();
    let {childId} = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [habits, setHabits] = useState();
    const [selectedDay, setSelectedDay] = useState(new Date());

    const statisticsRef = useRef({})

    useEffect(() => {
        loadHabits();
    }, [selectedDay]);

    function loadHabits(){
        setIsLoading(true);
        http.get(`/habits/day?childId=${childId}&day=${toApiDateString(selectedDay)}`)
            .then(({data}) => {
                setHabits(data);
            })
            .catch(err => {
                console.log(err);
                alert(err);
            })
            .finally(() => setIsLoading(false));
    }

    function toApiDateString(date) {
        return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    }

    function addHabit() {
        navigate("/children/" + childId + "/habits/");
    }

    function setHabitStatus(item, status) {
        http.post(`/habits/${item.habitId}/status?childId=${childId}&day=${toApiDateString(selectedDay)}&status=${status}`)
            .then(({data}) => {
                loadHabits();
                statisticsRef.current.loadStatistics();
            })
            .catch(err => {
                console.log(err);
                alert(err.message);
            });
    }

    function unsetHabit(item) {
        http.delete(`/habits/${item.habitId}/child/${childId}?day=${toApiDateString(selectedDay)}`)
            .then(({data}) => {
                loadHabits();
                statisticsRef.current.loadStatistics();
            })
            .catch(err => {
                console.log(err);
                alert(err.message);
            });
    }

    function chooseItem(date) {
        setSelectedDay(date);
    }

    return (
        <div>
            <HabitsPeriodLine parentRef={statisticsRef} childId={childId} selectedDay={selectedDay} chooseItem={chooseItem}></HabitsPeriodLine>
            <LoadingIndicator isLoading={isLoading}></LoadingIndicator>
            {habits && <HabitList habits={habits} setHabitStatus={setHabitStatus} unsetHabit={unsetHabit}></HabitList>}
            <button style={{...styles.button, marginTop: 20}} title="Добавить привычку" onClick={addHabit}>Добавить привычку
            </button>
        </div>
    );
};

ChildHabits.propTypes = {};

const styles = {
    button: {
        height: 60,
        width: 300,
        fontSize: 24,
        borderRadius: 2,
        alignItems: "center",
        backgroundColor: "#337ab7",
        flex: 1,
    },
    buttonText: {
        fontSize: 22,
        marginTop: 10,
        color: "white"
    },
    h2: {
        fontSize: 24
    }
}

export default ChildHabits;
