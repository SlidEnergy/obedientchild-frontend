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
             className={classnames(className, 'card-item', isSelected ? 'selected-item' : '')}>
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

              .selected-item {
                border: 2px solid red;
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

export default CharacterTraitItem;
