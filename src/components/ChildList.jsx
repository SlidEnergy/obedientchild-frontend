import React from 'react';
import ChildItem from "./ChildItem";
import PropTypes from "prop-types";

const ChildList = ({children, className}) => {
    return (
        <div className={className + ' list'}>
            {children.map(child => {
                return <ChildItem child={child} key={child.id}></ChildItem>;
            })}
            <style jsx="true">{`
              .list {
                overflow: auto;
                display: flex;
                flex-direction: row;
              }
            `}</style>
        </div>
    );
};

export default ChildList;
