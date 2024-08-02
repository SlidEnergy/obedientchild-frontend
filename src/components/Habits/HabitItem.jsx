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

    function getBorderByStatus(status) {
        if(status == "Failed")
            return "solid 1px red";
        if(status == "Done")
            return "solid 1px lightgreen";
        if(status == "None")
            return "solid 1px lightgray";
        if(status == "Skipped")
            return "solid 1px yellow";
    }

    return (
        <div style={{...styles.item, ...{...{border: getBorderByStatus(props.habit.status) }}}}>
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
        padding: 10,
        marginRight: 10
    },
};


export default HabitItem;
