import React, {useMemo} from 'react';
import ChildItem from "./ChildItem";
import classnames from "classnames";

const ChildList = ({children, className, selected}) => {
    const combinedClasses = useMemo(() => classnames(className, 'list'), [className]);

    return (
        <div className={combinedClasses}>
            {children.map(child => {
                return <ChildItem child={child} key={child.id} isSelected={child.id === selected}/>;
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
