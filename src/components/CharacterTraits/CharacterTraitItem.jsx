import React, {useState} from 'react';
import classnames from "classnames";

const CharacterTraitItem = ({item, selected, onSelectedChanged, className, style}) => {
    let [isSelected, setIsSelected] = useState(selected);

    function click() {
        let newSelected = !isSelected;
        setIsSelected(newSelected);
        onSelectedChanged?.(newSelected);
    }

    return (
        <div style={style} onClick={click}
             className={classnames(className, 'card-item', isSelected ? 'selected' : '')}>
            {<img src={item.imageUrl} alt='trait'/>}
            <div className='item-description'>
                <p className='title'>{item.title}</p>
                <p className='description'>{item.description}</p>
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
              }

              .card-item.selected {
                border: 2px solid #28a745; /* Более толстая зеленая рамка для выделенной карточки */
                box-shadow: 0 0 15px rgba(40, 167, 69, 0.5); /* Зеленая тень для акцента */
                background-color: rgba(40, 167, 69, 0.05); /* Светло-зеленый оттенок фона */
              }

              .title {
                font-size: 18px;
                margin-bottom: 10px;
              }

              .balance {
                font-size: 12px;
              }

              img {
                width: 100px;
                height: 100px;
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

export default CharacterTraitItem;
