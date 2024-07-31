import React from 'react';
import PropTypes from 'prop-types';
import Coins from "../Coins";

const HabitItem = props => {
    function doneHabit() {
        props.setHabitStatus && props.setHabitStatus(props.habit, "Done");
    }

    function skipHabit() {
        props.setHabitStatus && props.setHabitStatus(props.habit, "Skipped");
    }

    function clearHabitStatus() {
        props.setHabitStatus && props.setHabitStatus(props.habit, "None");
    }

    function unsetHabit() {
        props.unsetHabit && props.unsetHabit(props.habit);
    }

    function failedHabit() {
        props.setHabitStatus && props.setHabitStatus(props.habit, "Failed");
    }

    return (
        <div style={styles.item}>
            <img style={{
                width: 105,
                height: 105,
                marginRight: 20,
                borderRadius: 10
            }}
                   src={props.habit.imageUrl}></img>
            <div style={{
                flexDirection: "column",
                flex: 1
            }}>
                <p style={styles.title}>{props.habit.title}</p>
                <Coins count={props.habit.price} size={22}></Coins>
                <p style={styles.title}>{props.habit.status}</p>
                {props.habit.status == "None" && <button onClick={doneHabit}>Выполнить</button>}
                {props.habit.status == "None" && <button onClick={skipHabit}>Пропустить</button>}
                {props.habit.status == "None" && <button onClick={failedHabit}>Провалить</button>}
                {props.habit.status != "None" && <button onClick={clearHabitStatus}>Отменить</button>}
                {props.habit.status == "None" && <button onClick={unsetHabit}>Удалить</button>}
            </div>
        </div>
    );
};

HabitItem.propTypes = {
    habit: PropTypes.any,
    setHabitStatus: PropTypes.func,
    unsetHabit: PropTypes.func
};

const styles = {
    item: {
        marginVertical: 8,
        flexDirection: "row",
        width: 150,
        alignItems: "center",
        border: "solid 1px lightgray",
        padding: 10,
        marginRight: 10
    },
    title: {
        fontSize: 18,
        marginBottom: 10
    },
    balance: {
        fontSize: 12,
    },
};


export default HabitItem;
