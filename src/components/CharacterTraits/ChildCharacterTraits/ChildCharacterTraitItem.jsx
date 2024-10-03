import React from 'react';
import classnames from "classnames";

const ChildCharacterTraitItem = ({item, onChoose, className, style}) => {
    function chooseItem() {
        onChoose && onChoose(item);
    }

    return (
        <div style={style} onClick={chooseItem} className={classnames(className, 'card-item')}>
            {<img src={item.characterTrait.imageUrl} alt='trait'/>}
            <div className='item-description'>
                <p className='title'>{item.characterTrait.title}</p>
                <dl className='item-details'>
                    <div className="detail-row">
                        <dt>уровень:</dt>
                        <dd>{item.level}</dd>
                    </div>
                    <div className="detail-row">
                        <dt>опыт:</dt>
                        <dd>{item.experience}</dd>
                    </div>
                </dl>
            </div>
            <style jsx>{`
              .item-details {
                display: flex;
                flex-direction: column;
              }

              .detail-row {
                display: flex; /* Используем Flexbox для отображения <dt> и <dd> на одной линии */
                align-items: center; /* Выравнивание по вертикали, чтобы элементы располагались на одной линии */
                margin-bottom: 5px; /* Добавляем отступ для разделения строк */
              }

              dt {
                font-weight: normal; /* Убираем жирное выделение */
                margin-right: 10px; /* Добавляем отступ справа для разделения от <dd> */
              }

              dd {
                margin: 0; /* Убираем стандартные отступы */
              }

              .card-item {
                border: solid 1px lightgray;
                flex-direction: column;
                display: flex;
                align-items: center;
                padding: 10px;
                position: relative;
                flex: 1;
                cursor: pointer;
              }

              .empty-card-item {
                width: 150px;
                height: 227px;
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

export default ChildCharacterTraitItem;
