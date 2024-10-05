import React, {useEffect, useImperativeHandle, useState} from 'react';
import PropTypes from 'prop-types';
import HabitItem from "./HabitItem";
import HabitsPeriodLineItem from "./HabitsPeriodLineItem";
import {http} from "../../core/http-common";
import {toApiDateString} from "../../utils/DateUtils";

const week = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

const HabitsPeriodLine = ({selectedDay, chooseItem, childId, parentRef}) => {
    let [period, setPeriod] = useState(getPeriod(getToday()));
    let [statistics, setStatistics] = useState();

    let [percent, setPercent] = useState(0);

    useEffect(() => {
        if (statistics)
            setPercent((statistics.weekPercent * 100).toFixed(0))
    }, [statistics]);

    useImperativeHandle(parentRef, () => ({
        loadStatistics
    }), [/* dependencies (if any) */])

    useEffect(() => {
        loadStatistics();
    }, [period]);

    function loadStatistics() {
        http.get(`/habits/statistics?childId=${childId}&startDay=${toApiDateString(period.startDate)}&endDay=${toApiDateString(period.endDate)}`)
            .then(({data}) => {
                setStatistics(data);
            })
            .catch(err => {
                console.log(err);
                alert(err);
            })
            .finally();
    }

    function getPeriod(date) {
        if (!selectedDay)
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

    function periodLine_onChooseItem(date) {
        let newPeriod = getPeriod(date);

        setPeriod(newPeriod);

        chooseItem && chooseItem(date);
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
            <div className='week-statistic'>
                <div style={styles.arrow} onClick={prevWeek}>&lt;</div>
                {statistics &&
                    <div className="circular-progress">
                        <div className="circular-progress__inner">
                            <div className="circular-progress__text">{percent}</div>
                        </div>
                    </div>}

                <div style={styles.arrow} onClick={nextWeek}>&gt;</div>
            </div>
            <div className='period-line'>
                {period && period.list.map((item, index) => {
                    return <HabitsPeriodLineItem key={item.date} date={item.date} text={item.text}
                                                 isSelected={selectedDay.getDate() == item.date.getDate()}
                                                 chooseItem={periodLine_onChooseItem}
                                                 dayStatistic={statistics?.dayStatistics[index]}>
                    </HabitsPeriodLineItem>;
                })}
            </div>
            <style jsx>{`
              .week-statistic {
                display: flex;
                flex-direction: row;
                gap: 0.7rem;
              }

              .period-line {
                display: flex;
                flex-direction: row;
                gap: 5px;
              }

              .circular-progress {
                width: 80px;
                height: 80px;
                border-radius: 50%;
                background: conic-gradient(#00aaff 0% ${percent}%, #c0c0c0 ${percent}% 100%);
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
                gap: 5px;
              }

              .circular-progress__inner {
                width: 74px;
                height: 74px;
                background-color: white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
              }
            `}</style>

        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "1.5rem",
        alignItems: "center"
    },

    arrow: {
        cursor: "pointer",
        display: 'flex',
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
