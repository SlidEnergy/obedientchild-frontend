import React, {useEffect, useState, useRef} from 'react';
import HabitList from "./HabitList";
import {http} from "../../core/http-common";
import {useNavigate, useParams} from "react-router-dom";
import LoadingIndicator from "../LoadingIndicator";
import HabitsPeriodLine from "./HabitsPeriodLine";
import DayHabitsService from "../../core/Domain/day-habits-service";

const ChildHabits = () => {
    let navigate = useNavigate();
    let {childId} = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [habits, setHabits] = useState();
    const [selectedDay, setSelectedDay] = useState(new Date());

    const statisticsRef = useRef({});

    const dayHabitsService = new DayHabitsService();

    useEffect(() => {
        loadHabits();
    }, [selectedDay]);

    function loadHabits() {
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
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    }

    function addHabit() {
        navigate("/children/" + childId + "/habits/");
    }

    async function setHabitStatus(item, status) {
        try {
            await dayHabitsService.saveAndSend({...item, ...{childId, status}});
            loadHabits();
            statisticsRef.current.loadStatistics();
        } catch (err) {
            console.log(err);
            alert(err.message);
        }
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
            <h3>Привычки</h3>
            <HabitsPeriodLine parentRef={statisticsRef} childId={childId} selectedDay={selectedDay}
                              chooseItem={chooseItem}/>
            <LoadingIndicator isLoading={isLoading}/>
            {habits && <HabitList habits={habits} setHabitStatus={setHabitStatus} unsetHabit={unsetHabit}/>}
            <button className='btn btn-outline-primary button' title="Добавить привычку" onClick={addHabit}>Добавить
                привычку
            </button>
            <style jsx="true">{`
              .button {
                height: 60px;
                width: 300px;
                align-items: center;
                flex: 1;
                margin-top: 1.5rem;
              }

            `}</style>
        </div>
    );
};

export default ChildHabits;
