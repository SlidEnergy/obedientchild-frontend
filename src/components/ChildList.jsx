import React from 'react';
import ChildItem from "./ChildItem";
import PropTypes from "prop-types";

const ChildList = props => {
    return (
        <div>
            {props.children.map(child => {
                return <ChildItem child={child}></ChildItem>;
            })}
        </div>
    );
};

ChildList.propTypes = {
    children: PropTypes.array
};

export default ChildList;
