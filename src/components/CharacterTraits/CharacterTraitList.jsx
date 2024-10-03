import React from 'react';
import CharacterTraitItem from "./CharacterTraitItem";

const CharacterTraitList = ({traits, selectedIds, onSelectedIdsChanged}) => {
    async function item_selectedChanged(item, selected) {
        let list = [...selectedIds];
        if(selected) {
            list.push(item.id);
        } else {
            list.filter(x => x.id !== item.id);
        }

        onSelectedIdsChanged?.(list);
    }

    return (
        <div className='traits-list'>
            {traits.map(item => {
                return <CharacterTraitItem key={item.id} selected={selectedIds.some(x => x === item.id)} item={item} onSelectedChanged={(selected) => item_selectedChanged(item, selected)}/>;
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

export default CharacterTraitList;
