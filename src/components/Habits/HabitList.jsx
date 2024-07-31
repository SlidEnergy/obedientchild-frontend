import React from 'react';
import PropTypes from 'prop-types';
import HabitItem from "./HabitItem";

const HabitList = props => {
    return (
        <div style={styles.container}>
            {props.habits.map(item => {
                return <HabitItem key={item.habitId} habit={item} doneHabit={props.doneHabit} skipHabit={props.skipHabit} unsetHabit={props.unsetHabit} clearHabitStatus={props.clearHabitStatus}></HabitItem>;
            })}
        </div>
    );
};

HabitList.propTypes = {
    habits: PropTypes.any,
    doneHabit: PropTypes.func,
    skipHabit: PropTypes.func,
    unsetHabit: PropTypes.func,
    clearHabitStatus: PropTypes.func
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        margin: 10
    }
};

export default HabitList;
