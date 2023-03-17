import React from 'react';
import PropTypes from 'prop-types';
import RewardItem from "./RewardItem";

const RewardList = props => {
    return (
        <div style={{display: 'flex', flexDirection: 'row'}}>
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
        flex: 1,
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',

    }
};

export default RewardList;
