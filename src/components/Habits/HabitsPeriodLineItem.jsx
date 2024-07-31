import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import HabitItem from "./HabitItem";

const HabitsPeriodLineItem = props => {
    function chooseItem(){
        props.chooseItem && props.chooseItem(props.date);
    }

    return (
        <div onClick={chooseItem} style={{...styles.container, ...{...props.isSelected ? {border: "solid 2px red" } : {}}}}>
            <div>{props.text + " " + props.date.getDate()}</div>
            {props.dayStatistic && <div>
                {`${(props.dayStatistic.dayPercent * 100).toFixed(0)}%`}
            </div>}
        </div>
    );
};

HabitsPeriodLineItem.propTypes = {
    isSelected: PropTypes.bool,
    date: PropTypes.any,
    text: PropTypes.string,
    chooseItem: PropTypes.func,
    dayStatistic: PropTypes.any
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        margin: 10,
        cursor: "pointer",
        padding: 10,
        minWidth: 80,
        minHeight: 80,
        borderRadius: "50%",
        border: "solid 1px lightgray",
        marginRight: 5,
        marginLeft: 5
    },
};

export default HabitsPeriodLineItem;
