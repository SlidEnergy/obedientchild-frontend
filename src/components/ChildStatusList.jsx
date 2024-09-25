import React from 'react';
import ChildItem from "./ChildItem";
import PropTypes from "prop-types";
import {http} from "../core/http-common";
import {useParams} from "react-router-dom";

const ChildStatusList = ({childStatuses, deleteChildStatus, addChildStatus}) => {

    function deleteChildStatusInternal(childStatus) {
        deleteChildStatus && deleteChildStatus(childStatus);
    }

    function addChildStatusInternal(childStatus) {
        let text = prompt("Введите текст для статуса");

        addChildStatus && addChildStatus(text);
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            {childStatuses.map(childStatus => {
                return <div key={childStatus.id}><span>{childStatus.text}</span> <span style={{
                    color: 'red',
                    cursor: "pointer",
                }} onClick={() => deleteChildStatusInternal(childStatus)}>x</span></div>
            })}
            <button className='btn btn-link button me-4 mt-4' onClick={addChildStatusInternal}> Добавить статус
            </button>
        </div>
    );
};

ChildStatusList.propTypes = {
    childStatuses: PropTypes.array,
    deleteChildStatus: PropTypes.func
};

export default ChildStatusList;
