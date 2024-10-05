import React from 'react';
import PropTypes from 'prop-types';
import Coins from "../Coins";
import classnames from "classnames";

const ChildTaskItem = ({childTask,setChildTaskStatus,removeChildTask, className }) => {
    function doneTask() {
        setChildTaskStatus && setChildTaskStatus(childTask, "Done");
    }

    function clearTaskStatus() {
        setChildTaskStatus && setChildTaskStatus(childTask, "ToDo");
    }

    function unsetTask() {
        removeChildTask && removeChildTask(childTask);
    }

    function failedTask() {
        setChildTaskStatus && setChildTaskStatus(childTask, "Failed");
    }

    function getBorderByStatus(status) {
        if(status === "Failed")
            return "solid 1px red";
        if(status === "Done")
            return "solid 1px lightgreen";
        if(status === "ToDo")
            return "solid 1px lightgray";
    }

    return (
        <div className={classnames(className, 'habit-item')}>
            <img className='habit-image' src={childTask.deed.imageUrl} alt='task'/>
            <div className='habit-content'>
                <p className='item-title'>{childTask.deed.title}</p>
                <Coins count={childTask.deed.price} size={22}/>

                {/*{habit.status == "None" && <img className='image-button' src={'/done.jpg'} onClick={doneHabit}/>}*/}
                {/*{habit.status == "None" && <img className='image-button' src={'/fail.jpg'} onClick={failedHabit}/>}*/}
                <div className='button-container'>
                    {childTask.status === "ToDo" &&
                        <button className='btn btn-outline-danger square-button' onClick={failedTask}>-</button>}
                    {childTask.status === "ToDo" &&
                        <button className='btn btn-outline-success square-button' onClick={doneTask}>+</button>}
                </div>
            </div>
            {childTask.status !== "ToDo" &&
                <button className='btn btn-link cancel-button' onClick={clearTaskStatus}>Отменить</button>}
            {childTask.status === "ToDo" &&
                <button className='btn btn-link close-button' onClick={unsetTask}>x</button>}

            <style jsx>{`
              .habit-content {
                flex-direction: column;
                flex: 1;
                margin-left: 10px;
                gap: 20px;
                display: flex;
                align-items: center;
              }

              .habit-item {
                border: ${getBorderByStatus(childTask.status)};
                flex-direction: column;
                display: flex;
                //width: 120px;
                align-items: center;
                padding: 10px;
                position: relative;
                flex: 1;
                max-width: 150px;
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
                .skip-button, .cancel-button {
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

export default ChildTaskItem;
