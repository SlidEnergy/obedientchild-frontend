import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import HabitItem from "./HabitItem";

const HabitsPeriodLineItem = props => {
    function chooseItem(){
        props.chooseItem && props.chooseItem(props.date);
    }

    return (
        <div onClick={chooseItem} style={{...styles.container, ...{...props.isSelected ? {border: "solid 1px red" } : {}}}}>
            <div>{props.text}</div>
            <div>{props.date.getFullYear() + "." + (props.date.getMonth()+1) + "." + props.date.getDate()}</div>
            {props.dayStatistic && <div>
                {`${props.dayStatistic.doneHabitsCount + props.dayStatistic.skippedHabitsCount}/${props.dayStatistic.habitsCount}\n(${(props.dayStatistic.dayPercent * 100).toFixed(0)}%)`}
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
        padding: 10
    }
};

export default HabitsPeriodLineItem;
