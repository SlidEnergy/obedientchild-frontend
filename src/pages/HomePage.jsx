import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {http} from "../core/http-common";
import LoadingIndicator from "../components/LoadingIndicator";
import ChildList from "../components/ChildList";

const HomePage = props => {
    const [children, setChildren] = useState();
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        loadChildren();
    }, []);

    function loadChildren() {

        setRefreshing(true);
        http.get("/children")
            .then(({data}) => {
                setChildren(data);
            })
            .catch(err => {
                console.log(err);
                alert("Error: " + err.message);
            })
            .finally(() => {
                setIsLoading(false);
                setRefreshing(false);
            });
    }

    return (
        <div>
            <LoadingIndicator isLoading={isLoading}></LoadingIndicator>
            {!isLoading &&
                <ChildList children={children}>
                </ChildList>
            }
        </div>
    );
};

HomePage.propTypes = {

};

export default HomePage;
