import React from 'react';
import PropTypes from 'prop-types';
import {useNavigate, useParams} from 'react-router-dom';

const ChildItem = ({child, isSelected}) => {
    const navigate = useNavigate();
    let {childId} = useParams();

    function selectChild() {
        navigate(`/children/${child.id}`);
    }

    return (
        <div className='item' onClick={selectChild}>
            <div className={'image-container' + (isSelected ? ' selected' : '')}>
                <img src={child.avatar}></img>
                <div className='title'>{child.name} ({child.balance})</div>
            </div>
            {/*<p style={styles.balance}>{child.balance + "/" + child.bigGoalBalance + "/" + child.dreamBalance}</p>*/}
            <style jsx="true">{`
              .item {
                position: relative;
                cursor: pointer;
              }

              .image-container, img {
                width: ${childId ? '53px' : '160px'};
                height: ${childId ? '80px' : '240px'};
                margin-right: 30px;
                border-radius: 10px;
                position: relative;
                transition: width 0.5s, height 0.5s; /* Плавный переход */
              }

              .image-container.selected {
                border: 2px solid red;
              }

              .title {
                display: ${childId ? 'none' : 'block'};
                font-size: 24px;
                position: absolute;
                bottom: 1.5rem;
                font-weight: bold;
                background-color: rgba(255, 255, 255, 0.6);
                width: 100%;
                text-align: center;
              }
            `}</style>
        </div>
    );
};

export default ChildItem;
