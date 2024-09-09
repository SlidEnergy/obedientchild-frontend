import React from 'react';
import PropTypes from 'prop-types';
import Coins from "../Coins";

const HabitItem = ({habit, setHabitStatus, unsetHabit, className}) => {
    function doneHabit() {
        setHabitStatus && setHabitStatus(habit, "Done");
    }

    function skipHabit() {
        setHabitStatus && setHabitStatus(habit, "Skipped");
    }

    function clearHabitStatus() {
        setHabitStatus && setHabitStatus(habit, "None");
    }

    function unsetHabit() {
        unsetHabit && unsetHabit(habit);
    }

    function failedHabit() {
        setHabitStatus && setHabitStatus(habit, "Failed");
    }

    function getBorderByStatus(status) {
        if (status == "Failed")
            return "solid 1px red";
        if (status == "Done")
            return "solid 1px lightgreen";
        if (status == "None")
            return "solid 1px lightgray";
        if (status == "Skipped")
            return "solid 1px yellow";
    }

    return (
        <div className={className + ' item'}>
            <img className='habit-image' src={habit.imageUrl}></img>
            <div style={{
                flexDirection: "column",
                flex: 1,
                marginRight: 70,
                marginLeft: 10,
                gap: 20
            }}>
                <p>{habit.title}</p>
                <Coins count={habit.price} size={22}></Coins>

                {/*{habit.status == "None" && <img className='image-button' src={'/done.jpg'} onClick={doneHabit}/>}*/}
                {/*{habit.status == "None" && <img className='image-button' src={'/fail.jpg'} onClick={failedHabit}/>}*/}
                {habit.status == "None" && <button className='btn btn-outline-success square-button' onClick={doneHabit}>+</button>}
                {habit.status == "None" && <button className='btn btn-outline-danger square-button' onClick={failedHabit}>-</button>}
            </div>
            {habit.status == "None" &&
                <button className='btn btn-link skip-button' onClick={skipHabit}>Пропустить</button>}

            {habit.status != "None" &&
                <button className='btn btn-link cancel-button' onClick={clearHabitStatus}/>}
            {habit.status == "None" &&
                <button className='btn btn-link close-button' onClick={unsetHabit}>x</button>}

            <style jsx>{`
              .item {
                border: ${getBorderByStatus(habit.status)};
                margin-vertical: 8px;
                flex-direction: row;
                display: flex;
                //width: 120px;
                align-items: center;
                padding: 10px;
                margin-right: 10px;
                position: relative;
                flex: 1;
                min-width: 335px;
              }

              .habit-image {
                width: 100px;
                height: 100px;
                border-radius: 10px;
              }

              .image-button {
                width: 30px;
                height: 30px;
                cursor: pointer;
              }

              .square-button {
                margin-right: 10px;
                width: 60px;
              }

              .close-button {
                text-decoration-style: unset !important;
                text-decoration: none;
                color: red;
                position: absolute;
                font-size: 20px;
                font-weight: bold;
                right: 0;
                top: 0;
                width: 32px;
                height: 32px;
                padding: 0;
              }

              .skip-button, .cancel-button {
                position: absolute;
                right: 10px;
                bottom: 5px;
                padding: 0;
              }
              
              /* Медиа-запрос для мобильных устройств */
              @media (max-width: 768px) {
                .item {
                  width: 100%;
                }
              }
            `}</style>
        </div>
    );
};

export default HabitItem;
