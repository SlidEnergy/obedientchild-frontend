import React from 'react';
import PropTypes from 'prop-types';
import Coins from "../Coins";

const HabitItem = props => {
    function doneHabit() {
        props.doneHabit && props.doneHabit(props.habit);
    }

    function skipHabit() {
        props.skipHabit && props.skipHabit(props.habit);
    }

    function unsetHabit() {
        props.unsetHabit && props.unsetHabit(props.habit);
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
                {props.habit.status != "Done" && <button onClick={doneHabit}>Выполнить</button>}
                {props.habit.status != "Skipped" && <button onClick={skipHabit}>Пропустить</button>}
                <button onClick={unsetHabit}>Удалить</button>
            </div>
        </div>
    );
};

HabitItem.propTypes = {
    habit: PropTypes.any,
    doneHabit: PropTypes.func,
    skipHabit: PropTypes.func,
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
