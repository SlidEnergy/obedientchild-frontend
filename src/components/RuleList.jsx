import React from 'react';
import CardItem from "./CardItem";

const RuleList = ({rewards, onChoose}) => {
    return (
        <div className='list'>
            {rewards.map(item => {
                return <CardItem key={item.id} item={item} onChoose={onChoose}></CardItem>;
            })}
            <style jsx>{`
              .list {
                display: flex;
                flex-direction: row;
                gap: 1.5rem;
                flex-wrap: wrap;
              }
            `}</style>
        </div>
    );
};

export default RuleList;
