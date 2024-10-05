import React from 'react';
import Coins from "../Coins";
import classnames from "classnames";

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

    function unsetHabitInternal() {
        unsetHabit && unsetHabit(habit);
    }

    function failedHabit() {
        setHabitStatus && setHabitStatus(habit, "Failed");
    }

    function getClassByStatus(status) {
        if (status === "Failed")
            return "failed";
        if (status === "Done")
            return "done";
        if (status === "None")
            return "";
        if (status === "Skipped")
            return "skipped";
    }

    return (
        <div className={classnames(className, 'habit-item', getClassByStatus(habit.status))}>
            <img className='habit-image' src={habit.imageUrl} alt='habit'/>
            <div className='habit-content'>
                <span>{habit.title}</span>
                <Coins count={habit.price} size={22}/>

                {/*{habit.status == "None" && <img className='image-button' src={'/done.jpg'} onClick={doneHabit}/>}*/}
                {/*{habit.status == "None" && <img className='image-button' src={'/fail.jpg'} onClick={failedHabit}/>}*/}
                <div className='button-container'>
                    {habit.status === "None" &&
                        <button className='btn btn-outline-danger square-button' onClick={failedHabit}>-</button>}
                    {habit.status === "None" &&
                        <button className='btn btn-outline-success square-button' onClick={doneHabit}>+</button>}
                </div>
            </div>
            {habit.status === "None" &&
                <button className='btn btn-link skip-button' onClick={skipHabit}>Пропустить</button>}

            {habit.status !== "None" &&
                <button className='btn btn-link cancel-button' onClick={clearHabitStatus}>Отменить</button>}
            {habit.status === "None" &&
                <button className='btn btn-link close-button' onClick={unsetHabitInternal}>x</button>}

            <style jsx>{`
              .habit-content {
                flex-direction: column;
                flex: 1;
                margin-left: 10px;
                gap: 20px;
                display: flex;
                align-items: center;
              }

              .habit-item.done {
                border: 2px solid #28a745; /* Более толстая зеленая рамка для выделенной карточки */
                box-shadow: 0 0 15px rgba(40, 167, 69, 0.5); /* Зеленая тень для акцента */
                background-color: rgba(40, 167, 69, 0.05); /* Светло-зеленый оттенок фона */
              }

              .habit-item.skipped {
                border: 1px solid #ccc; /* Пунктирная светло-серая рамка, чтобы указать, что карточка была пропущена */
                background-color: rgba(200, 200, 200, 0.1); /* Светло-серый фон для эффекта "неактивности" */
                opacity: 0.7; /* Уменьшенная видимость, чтобы подчеркнуть неактивное состояние */
                transition: opacity 0.3s, background-color 0.3s;
              }

              .habit-item.failed {
                border: 1px solid #dc3545; /* Красная рамка, чтобы явно указать на неудачу */
                background-color: rgba(220, 53, 69, 0.1); /* Светло-красный фон для предупреждения */
                position: relative;
              }
              
              .habit-item {
                border: 1px solid #ccc; /* Светло-серая рамка для визуального отделения карточки */
                border-radius: 8px; /* Немного скругленные углы для придания мягкости */
                padding: 16px; /* Внутренние отступы для создания пространства внутри карточки */
                background-color: #fff; /* Белый фон для контрастности */
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Лёгкая тень для создания ощущения глубины */
                transition: box-shadow 0.3s, transform 0.3s; /* Плавные переходы для тени и трансформации при взаимодействии */
              }

              .habit-item:hover {
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15); /* Увеличенная тень при наведении для улучшения интерактивности */
                transform: translateY(-3px); /* Немного приподнять карточку для эффекта "подъема" */
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

              .button-container {
                display: flex;
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

              /* Медиа-запрос для мобильных устройств */
              @media (max-width: 768px) {
                .skip-button {
                  position: absolute;
                  left: 10px;
                  bottom: 5px;
                  padding: 0;
                } 
                .cancel-button {
                  position: absolute;
                  right: 10px;
                  bottom: 5px;
                  padding: 0;
                }

                .habit-item {
                  margin-vertical: 8px;
                  flex-direction: row;
                  display: flex;
                  //width: 120px;
                  align-items: center;
                  padding: 10px;
                  margin-right: 10px;
                  position: relative;
                  flex: 1;
                  max-width: none;
                  width: 100%;
                }
              }
            `}</style>
        </div>
    );
};

export default HabitItem;
