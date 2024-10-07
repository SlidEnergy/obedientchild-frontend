import React from 'react';
import CardItem from "./CardItem";

const RewardList = ({rewards, onChoose}) => {
    return (
        <div className='list'>
            {rewards.map(item => {
                return <CardItem key={item.id} item={item} onChoose={onChoose}/>;
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
