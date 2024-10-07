import React from 'react';
import './LoadingIndicator.css';

const LoadingIndicator = ({isLoading}) => {
    if(isLoading) {
        return (
            <div className="loader">
                <div className="spinner"/>
            </div>
        );
    }
};

export default LoadingIndicator;
