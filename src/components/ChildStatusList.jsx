import React from 'react';
import ChildItem from "./ChildItem";
import PropTypes from "prop-types";
import {http} from "../core/http-common";

const ChildStatusList = props => {

    function deleteChildStatus(childStatus) {
        props.deleteChildStatus && props.deleteChildStatus(childStatus);
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            {props.childStatuses.map(childStatus => {
                return <div key={childStatus.id}><span>{childStatus.text}</span> <span style={{
                    color: 'red',
                    cursor: "pointer",
                }} onClick={() => deleteChildStatus(childStatus)}>x</span></div>
            })}
        </div>
    );
};

ChildStatusList.propTypes = {
    childStatuses: PropTypes.array,
    deleteChildStatus: PropTypes.func
};

export default ChildStatusList;
