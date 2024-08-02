import React from 'react';
import PropTypes from 'prop-types';
import HabitItem from "./HabitItem";

const HabitList = props => {
    return (
        <div style={styles.container}>
            {props.habits.map(item => {
                return <HabitItem key={item.habitId} habit={item} setHabitStatus={props.setHabitStatus} unsetHabit={props.unsetHabit}></HabitItem>;
            })}
        </div>
    );
};

HabitList.propTypes = {
    habits: PropTypes.any,
    setHabitStatus: PropTypes.func,
    unsetHabit: PropTypes.func,
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        margin: 10,
        flexWrap: "wrap"
    }
};

export default HabitList;
