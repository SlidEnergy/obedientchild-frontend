import React from 'react';
import Coins from "./Coins";

const CardItem = ({className, onChoose, item, isEmpty}) => {
    function chooseItem() {
        onChoose && onChoose(item);
    }

    return (
        <div onClick={chooseItem} className={className ?? '' + ' card-item' + (isEmpty ? ' empty-card-item' : '')}>
            {item.imageUrl && <img src={item.imageUrl}></img>}
            <div className='item-description'>
                <p className='title'>{item.title}</p>
                {item.price && <Coins count={item.price} size={22}></Coins>}
            </div>
            <style jsx>{`
              .card-item {
                border: solid 1px lightgray;
                flex-direction: column;
                display: flex;
                align-items: center;
                padding: 10px;
                position: relative;
                flex: 1;
                max-width: 150px;
                cursor: pointer;
              }

              .empty-card-item {
                width: 150px;
                height: 300px;
              }

              .title {
                font-size: 18px;
                margin-bottom: 10px;
              }

              .balance {
                font-size: 12px;
              }

              img {
                width: 105px;
                height: 105px;
                margin-right: 20px;
                border-radius: 10px;
              }

              .item-description {
                flex-direction: column;
                flex: 1;
                display: flex;
                align-items: center;
              }
            `}</style>
        </div>
    );
};

export default CardItem;
