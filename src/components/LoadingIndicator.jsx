import React from 'react';
import './LoadingIndicator.css';

const LoadingIndicator = (props) => {
    if(props.isLoading) {
        return (
            <div className="loader">
                <div className="spinner"></div>
            </div>
        );
    }
};

export default LoadingIndicator;
