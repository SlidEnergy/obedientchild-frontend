import React from 'react';
import PropTypes from 'prop-types';
import Coins from "../Coins";
import Energy from "../Energy";

const LifeEnergyHistoryItem = props => {
    function revert() {
        props.onRevert && props.onRevert(props.item);
    }

    return (
        <div style={styles.item}>
            <span style={{marginRight: 20}}>{new Date(Date.parse(props.item.dateTime)).toLocaleString("ru-RU")}</span>
            <div style={{
                flexDirection: "column",
                flex: 1
            }}>
                <p style={styles.title}>{props.item.title}</p>
                <Energy count={props.item.amount} size={22}/>
            </div>
            <button onClick={revert}>revert</button>
        </div>
    );
};

LifeEnergyHistoryItem.propTypes = {
    item: PropTypes.any,
    onRevert: PropTypes.func
};

const styles = {
    item: {
        paddingBottom: "20px",
        display: "flex",
        marginVertical: 8,
        flexDirection: "row",
        alignItems: "center",
        cursor: "pointer"
    },
    title: {
        fontSize: 22,
        marginBottom: 10
    },
    balance: {
        fontSize: 12,
    },
};


export default LifeEnergyHistoryItem;
