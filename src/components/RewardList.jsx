import React from 'react';
import PropTypes from 'prop-types';
import ItemCard from "./ItemCard";

const RewardList = ({rewards, onChoose}) => {
    return (
        <div className='list'>
            {rewards.map(item => {
                return <ItemCard key={item.id} item={item} onChoose={onChoose}></ItemCard>;
            })}
            <style jsx>{`
              .list {
                display: flex;
                flexDirection: row;
                flexWrap: wrap;
                gap: 1.5rem;
              }
            `}</style>
        </div>
    );
};

export default RewardList;
