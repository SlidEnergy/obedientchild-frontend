import React from 'react';
import Coins from "./Coins";

const ItemCard = ({className, onChoose, item}) => {
    function chooseItem() {
        onChoose && onChoose(item);
    }

    return (
        <div onClick={chooseItem} className={className +' item'}>
            <img src={item.imageUrl}></img>
            <div className='item-description'>
                <p className='title'>{item.title}</p>
                <Coins count={item.price} size={22}></Coins>
            </div>
            <style jsx>{`
              .item {
                marginVertical: 8px;
                flexDirection: row;
                alignItems: center;
                cursor: pointer;
                border: solid 1px lightgray;
                padding: 10px;
                marginRight: 10px;
                marginBottom: 10px;
              }

              .title {
                fontSize: 18px;
                marginBottom: 10px;
              }

              .balance {
                fontSize: 12px;
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

export default ItemCard;
