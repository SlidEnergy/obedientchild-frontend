import React from 'react';
import PropTypes from 'prop-types';
import ChildTaskItem from "./ChildTaskItem";

const ChildTaskList = props => {
    return (
        <div style={styles.container}>
            {props.childTasks.map(item => {
                return <ChildTaskItem key={item.id} childTask={item} setChildTaskStatus={props.setChildTaskStatus} removeChildTask={props.removeChildTask}></ChildTaskItem>;
            })}
        </div>
    );
};

ChildTaskList.propTypes = {
    childTasks: PropTypes.any,
    setChildTaskStatus: PropTypes.func,
    removeChildTask: PropTypes.func,
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        margin: 10,
        flexWrap: "wrap",
        justifyContent: "center"
    }
};

export default ChildTaskList;
