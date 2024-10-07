import React from 'react';
import classnames from "classnames";

const ChildCharacterTraitItem = ({item, onChoose, className, style}) => {
    function chooseItem() {
        onChoose && onChoose(item);
    }

    return (
        <div style={style} onClick={chooseItem} className={classnames(className, 'card-item')}>
            <img src={item.characterTrait.imageUrl} alt='trait'/>
            <p className='title'>{item.characterTrait.title}</p>
            <div className='spacer'/>
            <div className='level-badge'>Lv. {item.level}</div>
            <div className="progress-container">
                <div className="progress-bar"/>
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
                cursor: pointer;
                background-color: #fff; /* Белый фон */
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Лёгкая тень */
                transition: box-shadow 0.3s, transform 0.3s; /* Плавные переходы */
                justify-content: flex-start; /* Элементы будут начинаться сверху */
                gap: 10px;
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

              .level-badge {
                background-color: #28a745; /* Зеленый фон для значка уровня */
                color: #fff; /* Белый текст */
                border-radius: 50%; /* Круглый значок */
                width: 40px; /* Ширина значка */
                height: 40px; /* Высота значка */
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                font-size: 16px;
              }

              .progress-container {
                width: 100%; /* Прогресс занимает всю ширину карточки */
                background-color: #d3d3d3; /* Цвет фона прогресс-бара (lightgray) */
                border-radius: 4px; /* Скругление углов прогресс-бара */
                height: 8px; /* Высота прогресс-бара */
              }

              .progress-bar {
                width: ${(item.experience) % 100}%;
                background-color: #28a745; /* Цвет заполнения прогресса (зеленый) */
                height: 100%; /* Высота совпадает с высотой контейнера */
                border-radius: 4px; /* Скругление углов заполненной части */
                transition: width 0.3s ease; /* Плавная анимация изменения ширины */
              }
            `}</style>
        </div>
    );
};

export default ChildCharacterTraitItem;
