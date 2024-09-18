import React from 'react';
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
                flex-direction: row;
                flex-wrap: wrap;
                gap: 1.5rem;
              }
            `}</style>
        </div>
    );
};

export default RewardList;
