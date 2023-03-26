import React from 'react';
import PropTypes from 'prop-types';
import Coins from "./Coins";

const CoinHistoryItem = props => {
    function revert() {
        props.onRevert && props.onRevert(props.item);
    }

    return (
        <div style={styles.item}>
            <img style={{
                width: 105,
                height: 105,
                marginRight: 20,
                borderRadius: 10
            }}
                   src={props.item.imageUrl}>
            </img>
            <div style={{
                flexDirection: "column",
                flex: 1
            }}>
                <p style={styles.title}>{props.item.title}</p>
                <Coins count={props.item.amount} size={22}></Coins>
            </div>
            <button onClick={revert}>revert</button>
        </div>
    );
};

CoinHistoryItem.propTypes = {
    item: PropTypes.any,
    onRevert: PropTypes.func
};

const styles = {
    item: {
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


export default CoinHistoryItem;
