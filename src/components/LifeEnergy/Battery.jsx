import React from 'react';
import './Battery.css'; // Импортируем стили

const Battery = ({ level, onClick }) => {
    return (
        <div className="battery" onClick={onClick}>
            <div className="battery-level" style={{ width: `${level}%` }}>

            </div>
            <span className="battery-text">{level}%</span>
            <div className="battery-cap"></div>
        </div>
    );
};

export default Battery;
