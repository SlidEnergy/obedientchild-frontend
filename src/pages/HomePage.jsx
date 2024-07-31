import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {http} from "../core/http-common";
import LoadingIndicator from "../components/LoadingIndicator";
import ChildList from "../components/ChildList";
import {useNavigate} from "react-router-dom";

const HomePage = props => {
    document.title = "Home";

    const navigate = useNavigate();

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
        <div style={{padding: '20px'}}>
            {isLoading && <LoadingIndicator isLoading={isLoading}></LoadingIndicator>}
            {!isLoading &&
                <ChildList children={children}>
                </ChildList>
            }
            <div style={styles.buttonList}>
                <button style={styles.button} onClick={() => navigate("/GoodDeeds")}>Хорошие дела</button>
                <button style={styles.button} onClick={() => navigate("/BadDeeds")}>Плохие дела</button>
                <button style={styles.button} onClick={() => navigate("/rewards")}>Желания</button>
                <button style={styles.button} onClick={() => navigate("/habits")}>Привычки</button>
            </div>
        </div>
    );
};

HomePage.propTypes = {

};

const styles = {
    container: {
        height: 500,
    },
    buttonList: {
        display: 'flex',
        flexDirection: 'column',
        padding: 20
    },
    button: {
        marginBottom: 20,
        height: 40
    }
};


export default HomePage;
