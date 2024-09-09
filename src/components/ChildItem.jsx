import React from 'react';
import PropTypes from 'prop-types';
import {useNavigate} from 'react-router-dom';

const ChildItem = ({child}) => {
    const navigate = useNavigate();

    function selectChild() {
        navigate(`/children/${child.id}`);
    }

    return (
        <div className='item' onClick={selectChild}>
            <div className='image-container'>
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
                width: 160px;
                height: 240px;
                margin-right: 30px;
                border-radius: 10px;
              }

              .title {
                font-size: 24px;
                position: absolute;
                bottom: 1.5rem;
                left: 1.5rem;
              }
            `}</style>
        </div>
    );
};

export default ChildItem;
