import React from 'react';
import PropTypes from 'prop-types';
import ItemCard from "../ItemCard";
import CoinHistoryItem from "./CointHistoryItem";

const CoinHistoryList = props => {
    return (
        <div>
            {props.items.map(item => {
                return <CoinHistoryItem key={item.id} item={item} onRevert={props.onRevert}></CoinHistoryItem>;
            })}
        </div>
    );
};

CoinHistoryList.propTypes = {
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

export default CoinHistoryList;
