import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import HabitItem from "./HabitItem";

const HabitsPeriodLineItem = props => {
    function chooseItem(){
        props.chooseItem && props.chooseItem(props.date);
    }

    return (
        <div onClick={chooseItem}>
            <div style={{...styles.container, ...{...props.isSelected ? {border: "solid 2px red" } : {}}}}>{props.date.getDate()}</div>
            <div>{props.text}</div>
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
        margin: 5,
        cursor: "pointer",
        padding: 8,
        width: 40,
        height: 40,
        borderRadius: "50%",
        border: "solid 1px lightgray",
    },
};

export default HabitsPeriodLineItem;
