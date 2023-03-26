import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Popup from "reactjs-popup";
import LoadingIndicator from "./LoadingIndicator";
import RewardList from "./RewardList";
import 'reactjs-popup/dist/index.css';
import {http} from "../core/http-common";

const GoodDeedsPopup = props => {
    const [isLoading, setIsLoading] = useState(true);
    const [rewards, setRewards] = useState();

    function loadRewards() {
        setIsLoading(true);
        http.get("/gooddeeds")
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
        <Popup
            onClose={() => props.onOpenChanged(false)}
            onOpen={loadRewards}
            open={props.open}>
            <LoadingIndicator isLoading={isLoading}></LoadingIndicator>
            {!isLoading &&
                <RewardList rewards={rewards} onChoose={(item) => props.onChosen(item)}>
                </RewardList>
            }
        </Popup>
    );
};

GoodDeedsPopup.propTypes = {
    open: PropTypes.bool,
    onOpenChanged: PropTypes.func,
    onChosen: PropTypes.func
};

export default GoodDeedsPopup;
