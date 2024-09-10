import React from 'react';

const Coins = ({count, size}) => {
    let filter = count < 0 ? "hue-rotate(314deg)" : "";
    const renderCoinCount = false

    return (
        <div>
            {renderCoinCount && <div className='coin-list'>
                {Array.from(Array(Math.abs(count || 0)), (e, i) => {
                    return <img key={i} src={'/coin.png'}/>
                })}
            </div>
            }
            {!renderCoinCount && <div className='short-coin-container'>
                <span className='text'>{count + ' x '}</span>
                <img src={'/coin.png'}/>
            </div>
            }
            <style jsx>{`
              .coin-list {
                flex: 1;
                flexDirection: row;
                flexWrap: wrap;
              }

              .short-coin-container {
                display: flex;
                gap: 10px;
                align-items: center;
              }

              .text {
                font-size: 24px;
              }

              img {
                width: ${size}px;
                height: ${size}px;
                marginRight: 10px;
                marginBottom: 10px;
                filter: ${filter}
              }
            `}</style>
        </div>
    );
}

export default Coins;
