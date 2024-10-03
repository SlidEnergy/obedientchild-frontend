import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import LoadingIndicator from "../../components/LoadingIndicator";
import RewardList from "../../components/RewardList";
import {http} from "../../core/http-common";
import {useNavigate} from "react-router-dom";

const GoodDeedsPage = props => {
    const navigate = useNavigate()
    const [goodDeeds, setGoodDeeds] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        http.get("/deeds?type=GoodDeed")
            .then(({data}) => {
                setGoodDeeds(data);
            })
            .catch(err => {
                console.log(err);
                alert(err);
            })
            .finally(() => setIsLoading(false));
    }, []);

    function add() {
        navigate("/goodDeeds/add");
    }

    function onChoose(item) {
        navigate("/goodDeeds/" + item.id);
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
                <RewardList rewards={goodDeeds} onChoose={onChoose}>
                </RewardList>
            </div>
        </div>
    );
};

GoodDeedsPage.propTypes = {

};

export default GoodDeedsPage;
