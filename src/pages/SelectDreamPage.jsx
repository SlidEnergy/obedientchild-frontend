import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import LoadingIndicator from "../components/LoadingIndicator";
import {useNavigate, useParams} from "react-router-dom";
import RewardList from "../components/RewardList";
import {http} from "../core/http-common";

const SelectDreamPage = props => {
    document.title = "Выбор мечты";

    const navigate = useNavigate();
    const {childId} = useParams();
    const [rewards, setRewards] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
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
    }, []);

    function onChoose(item) {
        http.post(`/children/${childId}/setdream`, item.id)
            .then(({data}) => {
                console.log("success");
                navigate("/children/" + childId);
            })
            .catch(err => {
                console.log(err);
                alert(err);
            });
    }

    return (
        <div style={{
            alignItems: "center",
            alignContent: "center",
            flexDirection: "column",
            height: "100%",
            width: "100%",
            padding: 0
        }}>
            <LoadingIndicator isLoading={isLoading}></LoadingIndicator>
            {!isLoading && <RewardList rewards={rewards} onChoose={onChoose}>
            </RewardList>}
        </div>
    );
};

SelectDreamPage.propTypes = {

};

export default SelectDreamPage;
