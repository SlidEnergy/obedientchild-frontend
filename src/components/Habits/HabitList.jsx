import React from 'react';
import HabitItem from "./HabitItem";

const HabitList = ({unsetHabit, setHabitStatus, habits}) => {
    return (
        <div className='habit-list'>
            {habits.map(item => {
                return <HabitItem key={item.habitId} habit={item} setHabitStatus={setHabitStatus}
                                  unsetHabit={unsetHabit}/>;
            })}
            <style jsx>{`
              .habit-list {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                justify-content: center;
                gap: 20px;
                margin-top: 1.5rem;
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
}

export default HabitList;
