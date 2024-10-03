import React from 'react';
import ChildCharacterTraitItem from "./ChildCharacterTraitItem";

const ChildCharacterTraitList = ({traits, onChoose}) => {
    return (
        <div className='traits-list'>
            {traits.map(item => {
                return <ChildCharacterTraitItem key={item.id} item={item} onChoose={onChoose}/>;
            })}
            <style jsx>{`
              .traits-list {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                justify-content: center;
                gap: 20px;
                margin-top: 1.5rem;
              }

              /* Медиа-запрос для мобильных устройств */
              @media (max-width: 768px) {
                .habit-list {
                  flex-direction: column;
                }
              }
            `}</style>
        </div>
    );
}

export default ChildCharacterTraitList;
