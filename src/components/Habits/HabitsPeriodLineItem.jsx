import React, {useEffect, useState} from 'react';
import classnames from "classnames";

const HabitsPeriodLineItem = ({isSelected, date, text, chooseItem, dayStatistic}) => {
    let [percent, setPercent] = useState(0);

    function click() {
        chooseItem && chooseItem(date);
    }

    useEffect(() => {
        if (dayStatistic)
            setPercent((dayStatistic.dayPercent * 100).toFixed(0))
        //setProgress(dayStatistic.dayPercent * 100);
    }, [dayStatistic]);

    return (
        <div onClick={click}>
            <div className={classnames("circular-progress", isSelected ? 'selected' : '')}>
                <div className="circular-progress__inner">
                    <div className="circular-progress__text">{date.getDate()}</div>
                </div>
            </div>

            <div>{text}</div>
            <style jsx>{`
              .circular-progress {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: conic-gradient(#00aaff 0% ${percent}%, lightgray ${percent}% 100%);
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
                gap: 5px;
              }
              
              .circular-progress.selected {
                  transform: scale(1.1);
                  box-shadow: 0 0 10px rgba(0, 170, 255, 0.6); /* Подсветка активного элемента */
                }

              .circular-progress__inner {
                width: 36px;
                height: 36px;
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
