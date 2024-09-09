import React from 'react';
import PropTypes from 'prop-types';
import LifeEnergyHistoryItem from "./LifeEnergyHistoryItem";

const LifeEnergyHistoryList = props => {
    return (
        <div>
            {props.items.map(item => {
                return <LifeEnergyHistoryItem key={item.id} item={item} onRevert={props.onRevert}></LifeEnergyHistoryItem>;
            })}
        </div>
    );
};

LifeEnergyHistoryList.propTypes = {
    items: PropTypes.any,
    onRevert: PropTypes.func
};

const styles = {
    container: {
        flex: 1,
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',

    }
};

export default LifeEnergyHistoryList;
