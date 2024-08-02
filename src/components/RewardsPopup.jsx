import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import LoadingIndicator from "./LoadingIndicator";
import RewardList from "./RewardList";
import 'reactjs-popup/dist/index.css';
import {http} from "../core/http-common";

const RewardsPopup = props => {
    const [isLoading, setIsLoading] = useState(true);
    const [rewards, setRewards] = useState();

    useEffect(() => {
        document.documentElement.style.overflow = props.isOpened ? 'hidden' : "scroll";
        document.body.scroll = props.isOpened ? "no" : "yes";
    },[props.isOpened])

    useEffect(() => {
        loadData();
    }, []);

    function loadData() {
        setIsLoading(true);
        http.get("/rewards")
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
        <div style={{...styles.container, ...{...{display: props.isOpened ? "block" : "none" }}}}>
            <LoadingIndicator isLoading={isLoading}></LoadingIndicator>
            {!isLoading &&
                <RewardList rewards={rewards} onChoose={(item) => props.onChosen(item)}>
                </RewardList>
            }
            <button style={styles.button} onClick={() => props.onOpenChanged(false)}>Закрыть</button>
        </div>
    );
};

const styles = {
    container: {
        width: "100%",
        height: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        backgroundColor: "white",
        padding: 10,
        overflow: "auto"
    },
    button: {
        marginTop: 10,
        height: 60,
        width: 300,
        fontSize: 24,
        borderRadius: 2,
        alignItems: "center",
        backgroundColor: "#337ab7",
        flex: 1,
    }
}

RewardsPopup.propTypes = {
    isOpened: PropTypes.bool,
    onOpenChanged: PropTypes.func,
    onChosen: PropTypes.func
};

export default RewardsPopup;
