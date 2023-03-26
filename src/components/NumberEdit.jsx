import React from 'react';
import PropTypes from 'prop-types';

const NumberEdit = props => {
    return (
        <div style={props.style}>
            <div style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: 100
            }}>
                <button onClick={() => props.value > 1 && props.onValueChanged(props.value - 1)}>-</button>
                <p style={{
                    width: 100,
                }}>{props.value}</p>
                <button onClick={() => props.onValueChanged(props.value + 1)}>+</button>
            </div>
        </div>
    );
};

NumberEdit.propTypes = {
    style: PropTypes.any,
    value: PropTypes.number,
    onValueChanged: PropTypes.func
};

export default NumberEdit;
