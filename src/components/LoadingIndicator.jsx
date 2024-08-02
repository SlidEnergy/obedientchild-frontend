import React from 'react';

const LoadingIndicator = (props) => {
    if(props.isLoading) {
        return (
            <div>
                Indicator
            </div>
        );
    }
};

export default LoadingIndicator;
