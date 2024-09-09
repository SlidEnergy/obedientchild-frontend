import React from 'react';
import PropTypes from 'prop-types';
import HabitItem from "./HabitItem";

const HabitList = props => {
    return (
        <div className='habit-list'>
            {props.habits.map(item => {
                return <HabitItem key={item.habitId} habit={item} setHabitStatus={props.setHabitStatus}
                                  unsetHabit={props.unsetHabit}></HabitItem>;
            })}
            <style jsx>{`
              .habit-list {
                display: flex;
                flex-direction: row;
                margin: 1.5rem;
                flex-wrap: wrap;
                justify-content: center;
                gap: 20px
              }

              /* Медиа-запрос для мобильных устройств */
              @media (max-width: 768px) {
                .habit-list {
                  flex-direction: column;
                }
              }
            `}</style>
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
        flexWrap: "wrap",
        justifyContent: "center",
        gap: '20px'
    }
};

export default HabitList;
