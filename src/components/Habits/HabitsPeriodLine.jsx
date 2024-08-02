import React, {useEffect, useImperativeHandle, useState} from 'react';
import PropTypes from 'prop-types';
import HabitItem from "./HabitItem";
import HabitsPeriodLineItem from "./HabitsPeriodLineItem";
import {http} from "../../core/http-common";

const week = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

const HabitsPeriodLine = props => {
    let [period, setPeriod] = useState(getPeriod(getToday()));
    let [statistics, setStatistics] = useState();

    useImperativeHandle(props.parentRef, () => ({
        loadStatistics
    }), [/* dependencies (if any) */])

    useEffect(() => {
        loadStatistics();
    }, [period]);

    function loadStatistics() {
        http.get(`/habits/statistics?childId=${props.childId}&startDay=${toApiDateString(period.startDate)}&endDay=${toApiDateString(period.endDate)}`)
            .then(({data}) => {
                setStatistics(data);
            })
            .catch(err => {
                console.log(err);
                alert(err);
            })
            .finally();
    }

    function toApiDateString(date) {
        return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    }

    function getPeriod(date) {
        if(!props.selectedDay)
            return;

        const today = new Date(date);

        const firstDay = new Date(
            today.setDate(today.getDate() - today.getDay() + (today.getDay() == 0 ? -6 : 1)),
        );

        const lastDay = new Date(
            today.setDate(today.getDate() - today.getDay() + 7),
        );

        let list = [];
        let start = new Date(firstDay).setHours(0, 0, 0, 0);
        for (let i = 0; i < 7; i++) {
            list.push({text: week[i], date: addDays(start, i)});
        }

        return {startDate: firstDay, endDate: lastDay, list: list};
    }

    function getToday() {
        let date = new Date();
        return new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate()
        );
    }

    function addDays(date, days) {
        let result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    function chooseItem(date) {
        let newPeriod = getPeriod(date);

        setPeriod(newPeriod);

        props.chooseItem && props.chooseItem(date);
    }

    function prevWeek() {
        let newPeriod = getPeriod(addDays(period.startDate, -7));

        setPeriod(newPeriod);
    }

    function nextWeek() {
        let newPeriod = getPeriod(addDays(period.startDate, 7));

        setPeriod(newPeriod);
    }

    return (
        <div style={styles.container}>
            <div style={styles.arrow} onClick={prevWeek}>&lt;</div>
            {statistics && <div style={styles.weekStatistic}>
                {`${(statistics.weekPercent * 100).toFixed(0)}%`}
            </div>}
            <div style={styles.arrow} onClick={nextWeek}>&gt;</div>

            <div style={styles.periodLine}>
            {period && period.list.map((item, index) => {
                return <HabitsPeriodLineItem key={item.date} date={item.date} text={item.text}
                                             isSelected={props.selectedDay.getDate() == item.date.getDate()}
                                             chooseItem={chooseItem}
                dayStatistic={statistics?.dayStatistics[index]}>
                </HabitsPeriodLineItem>;
            })}
            </div>


        </div>
    );
};

HabitsPeriodLine.propTypes = {
    selectedDay: PropTypes.any,
    chooseItem: PropTypes.func,
    childId: PropTypes.string,
    parentRef: PropTypes.any
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        margin: 10,
        flexWrap: "wrap",
        justifyContent: "center"
    },
    periodLine: {
        display: 'flex',
        flexDirection: 'row',
        margin: 10,
        flexWrap: "wrap"
    },
    arrow: {
        cursor: "pointer",
        display: 'flex',
        margin: "15px 10px 15px 10px",
        padding: "15px 10px 15px 10px",
        alignItems: "center"
    },
    weekStatistic: {
        borderRadius: "50%",
        border: "solid 2px gray",
        whiteSpace: "pre-line",
        width: 80,
        height: 80,
        paddingTop: 25,
        alignSelf: "center"
    }
};

export default HabitsPeriodLine;
