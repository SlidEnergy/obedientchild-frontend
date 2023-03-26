import React from 'react';
import PropTypes from 'prop-types';

const Coins = props => {
    let filter = props.count < 0 ? "hue-rotate(314deg)" : "";
    return (
        <div style={{
            flex: 1,
            flexDirection: "row",
            flexWrap: "wrap",
        }}>
            { Array.from(Array(Math.abs(props.count || 0)), (e, i) => {
                return <img key={i} style={{
                    width: props.size,
                    height: props.size,
                    marginRight: 10,
                    marginBottom: 10,
                    filter: filter
                }}
                              src={'/coin.png'}
                />
            })}
        </div>
    );
};

Coins.propTypes = {
    count: PropTypes.number,
    size: PropTypes.number
};

export default Coins;
