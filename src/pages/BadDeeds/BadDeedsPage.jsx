import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import LoadingIndicator from "../../components/LoadingIndicator";
import RewardList from "../../components/RewardList";
import {api} from "../../core/api";
import {useNavigate} from "react-router-dom";

const BadDeedsPage = props => {
    const navigate = useNavigate()
    const [badDeeds, setBadDeeds] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        api.get("/deeds?type=BadDeed")
            .then(({data}) => {
                setBadDeeds(data);
            })
            .catch(err => {
                console.log(err);
                alert(err);
            })
            .finally(() => setIsLoading(false));
    }, []);

    function add() {
        navigate("/baddeeds/add");
    }

    function onChoose(item) {
        navigate("/baddeeds/" + item.id);
    }

    if (isLoading) {
        return <LoadingIndicator isLoading={isLoading}></LoadingIndicator>;
    }

    return (
        <div>
            <div style={{
                alignItems: "center",
                alignContent: "center",
                flexDirection: "column",
                height: "100%",
                width: "100%",
                padding: 20
            }}>
                <button style={{marginBottom: 20}} onClick={add}>Добавить</button>
                <LoadingIndicator isLoading={isLoading}></LoadingIndicator>
                <RewardList rewards={badDeeds} onChoose={onChoose}>
                </RewardList>
            </div>
        </div>
    );
};

BadDeedsPage.propTypes = {

};

export default BadDeedsPage;
