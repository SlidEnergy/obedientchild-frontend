import React from 'react';
import PropTypes from 'prop-types';
import ChildTaskItem from "./ChildTaskItem";

const ChildTaskList = ({childTasks, setChildTaskStatus, removeChildTask}) => {
    return (
        <div className='habit-list'>
            {childTasks.map(item => {
                return <ChildTaskItem key={item.id} childTask={item} setChildTaskStatus={setChildTaskStatus} removeChildTask={removeChildTask}></ChildTaskItem>;
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
};

export default ChildTaskList;
