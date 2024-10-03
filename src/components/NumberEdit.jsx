import React from 'react';

const NumberEdit = ({style, value, onValueChanged}) => {
    return (
        <div style={style}>
            <div style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: 100
            }}>
                <button type='button' className='btn btn-outline-primary' onClick={() => value > 1 && onValueChanged(value - 1)}>-
                </button>
                <div className='value-container'>{value}</div>
                <button type='button' className='btn btn-outline-primary' onClick={() => onValueChanged(value + 1)}>+</button>
            </div>
            <style jsx>{`
              .content-container {
                display: flex;
                flex-direction: row;
                align-items: center;
                width: 100px;
              }

              .value-container {
                width: 100px;
              }
            `}</style>
        </div>
    );
};

export default NumberEdit;
