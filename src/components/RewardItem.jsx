import React from 'react';
import PropTypes from 'prop-types';
import Coins from "./Coins";

const RewardItem = props => {
    function chooseItem() {
        props.onChoose && props.onChoose(props.reward);
    }

    return (
        <div onClick={chooseItem} style={styles.item}>
            <img style={{
                width: 105,
                height: 105,
                marginRight: 20,
                borderRadius: 10
            }}
                   src={props.reward.imageUrl}></img>
            <div style={{
                flexDirection: "column",
                flex: 1
            }}>
                <p style={styles.title}>{props.reward.title}</p>
                <Coins count={props.reward.price} size={22}></Coins>
            </div>
        </div>
    );
};

RewardItem.propTypes = {
    reward: PropTypes.any,
    onChoose: PropTypes.func
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


export default RewardItem;
