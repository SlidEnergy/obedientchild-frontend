import React from 'react';
import PropTypes from 'prop-types';
import RewardItem from "./RewardItem";

const RewardList = props => {
    return (
        <div style={styles.container}>
            {props.rewards.map(item => {
                return <RewardItem key={item.id} reward={item} onChoose={props.onChoose}></RewardItem>;
            })}
        </div>
    );
};

RewardList.propTypes = {
    rewards: PropTypes.any,
    onChoose: PropTypes.func
};

const styles = {
    container: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap"
    }
};

export default RewardList;
