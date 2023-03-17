import React from 'react';
import ChildItem from "./ChildItem";
import PropTypes from "prop-types";

const ChildList = props => {
    return (
        <div style={{display: 'flex', flexDirection: 'row'}}>
            {props.children.map(child => {
                return <ChildItem child={child} key={child.id}></ChildItem>;
            })}
        </div>
    );
};

ChildList.propTypes = {
    children: PropTypes.array
};

export default ChildList;
