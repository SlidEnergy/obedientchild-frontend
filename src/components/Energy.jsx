import React from 'react';
import PropTypes from 'prop-types';

const Energy = props => {
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
                              src={'/energy.png'}
                />
            })}
        </div>
    );
};

Energy.propTypes = {
    count: PropTypes.number,
    size: PropTypes.number
};

export default Energy;
