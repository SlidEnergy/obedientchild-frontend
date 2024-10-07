import React from 'react';
import Coins from "./Coins";

const CardItem = ({className, onChoose, item, isEmpty, style}) => {
    function chooseItem() {
        onChoose && onChoose(item);
    }

    return (
        <div style={style} onClick={chooseItem}
             className={className ?? '' + ' card-item' + (isEmpty ? ' empty-card-item' : '')}>
            {item.imageUrl && <img src={item.imageUrl} alt='deed'/>}
            <p className='title'>{item.title}</p>
            <input className='deed-type' type='hidden' value={item.type}/>
            <div className='spacer'/>
            {item.price && <Coins count={item.price} size={22}/>}
            <style jsx>{`
              .card-item {
                border: solid 1px lightgray;
                flex-direction: column;
                display: flex;
                align-items: center;
                padding: 10px;
                position: relative;
                flex: 1;
                cursor: pointer;
                background-color: #fff; /* Белый фон */
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Лёгкая тень */
                transition: box-shadow 0.3s, transform 0.3s; /* Плавные переходы */
                justify-content: flex-start; /* Элементы будут начинаться сверху */
                gap: 10px;
                max-width: 150px;
                border-radius: 10px;
              }

              .title {
                font-size: 18px;
                margin: 0; /* Убираем отступы, чтобы заголовок занимал меньше места */
                align-self: center; /* Центрирование заголовка по горизонтали */
              }

              img {
                width: 100px;
                height: 100px;
                border-radius: 10px;
              }

              .spacer {
                flex: 1; /* Растягивает пространство, чтобы прогресс оказался снизу */
              }

              .empty-card-item {
                width: 150px;
                height: 227px;
              }

              .balance {
                font-size: 12px;
              }
            `}</style>
        </div>
    );
};

export default CardItem;
