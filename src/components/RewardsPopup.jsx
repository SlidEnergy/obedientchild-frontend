import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import LoadingIndicator from "./LoadingIndicator";
import RewardList from "./RewardList";
import 'reactjs-popup/dist/index.css';
import {http} from "../core/http-common";

const RewardsPopup = ({className, isOpened, onChosen, onOpenChanged}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [rewards, setRewards] = useState();

    useEffect(() => {
        document.documentElement.style.overflow = isOpened ? 'hidden' : "scroll";
        document.body.scroll = isOpened ? "no" : "yes";
    }, [isOpened])

    useEffect(() => {
        loadData();
    }, []);

    function loadData() {
        setIsLoading(true);
        http.get("/deeds?type=Reward")
            .then(({data}) => {
                setRewards(data);
            })
            .catch(err => {
                console.log(err);
                alert(err);
            })
            .finally(() => setIsLoading(false));
    }

    return (
        <div className={className + ' popup-container'}>
            <LoadingIndicator isLoading={isLoading}/>
            {!isLoading &&
                <RewardList rewards={rewards} onChoose={(item) => onChosen(item)}>
                </RewardList>
            }
            <button className='btn btn-primary button' onClick={() => onOpenChanged(false)}>Закрыть</button>
            <style jsx>{`
              .popup-container {
                display: ${isOpened ? 'block' : 'none'};
                width: 100%;
                height: 100%;
                position: fixed;
                top: 0;
                left: 0;
                background-color: white;
                padding: 1.5rem;
                overflow: auto;
                z-index: 1;
              }

              button {
                margin-top: 1.5rem;
                height: 60px;
                width: 300px;
              }
            `}</style>
        </div>
    );
};

const styles = {}

RewardsPopup.propTypes = {
    isOpened: PropTypes.bool,
    onOpenChanged: PropTypes.func,
    onChosen: PropTypes.func
};

export default RewardsPopup;
