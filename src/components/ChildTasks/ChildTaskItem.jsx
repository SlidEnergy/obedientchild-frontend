import React from 'react';
import PropTypes from 'prop-types';
import Coins from "../Coins";

const ChildTaskItem = props => {
    function doneTask() {
        props.setChildTaskStatus && props.setChildTaskStatus(props.childTask, "Done");
    }

    function clearTaskStatus() {
        props.setChildTaskStatus && props.setChildTaskStatus(props.childTask, "ToDo");
    }

    function unsetTask() {
        props.removeChildTask && props.removeChildTask(props.childTask);
    }

    function failedTask() {
        props.setChildTaskStatus && props.setChildTaskStatus(props.childTask, "Failed");
    }

    function getBorderByStatus(status) {
        if(status == "Failed")
            return "solid 1px red";
        if(status == "Done")
            return "solid 1px lightgreen";
        if(status == "None")
            return "solid 1px lightgray";
    }

    return (
        <div style={{...styles.item, ...{...{border: getBorderByStatus(props.childTask.status) }}}}>
            <img style={{
                width: 100,
                height: 100,
                borderRadius: 10
            }}
                   src={props.childTask.goodDeed.imageUrl}></img>
            <div style={{
                flexDirection: "column",
                flex: 1
            }}>
                <p style={styles.title}>{props.childTask.goodDeed.title}</p>
                <Coins count={props.childTask.goodDeed.price} size={22}></Coins>
                {props.childTask.status == "ToDo" && <button onClick={doneTask}>Выполнить</button>}
                {props.childTask.status == "ToDo" && <button onClick={failedTask}>Провалить</button>}
                {props.childTask.status != "ToDo" && <button onClick={clearTaskStatus}>Отменить</button>}
                {props.childTask.status == "ToDo" && <button onClick={unsetTask}>Удалить</button>}
            </div>
        </div>
    );
};

ChildTaskItem.propTypes = {
    childTask: PropTypes.any,
    setChildTaskStatus: PropTypes.func,
    removeChildTask: PropTypes.func
};

const styles = {
    item: {
        marginVertical: 8,
        flexDirection: "row",
        width: 120,
        alignItems: "center",
        padding: 10,
        marginRight: 10
    },
};


export default ChildTaskItem;
