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
            <iframe src="http://www.toodledo.com/slim" width="100%" height="500"></iframe>
            <iframe
                src="https://calendar.google.com/calendar/embed?height=NaN&wkst=1&ctz=Europe%2FMoscow&bgcolor=%23ffffff&showTz=0&showPrint=0&showTitle=0&src=c2xpZGVuZXJneUBnbWFpbC5jb20&src=NjgwNGUyZDMwMDM3OWY5MTRmZDU5MTM1ZDk4NzgwNjUxNGQ5OWFhZmRkNzE5ZDJiNWNmMGI4MjlmOWUxNTNkNkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=OGMwYjY3YjE3ODY1ZGM1NjkzNzc5NjNlMTc2ODg1MjQwZmU2MmFjZjNiMzhkNzk3OGY0ZmYzNDVhMjI3YzNkOEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=M2M5YWExNjRiOGNmYjY2ZDI5NDIxYTU2ZjQyMGYyMzY0YTNmY2ZiNDBmNWFmYTZkMmFkYTBjOTE3YzdjNWE0NEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=cnUucnVzc2lhbiNob2xpZGF5QGdyb3VwLnYuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%237986CB&color=%230B8043&color=%23D81B60&color=%238E24AA&color=%2333B679&color=%230B8043"
                css="border-width:0" width="100%" height="900px" frameBorder="0" scrolling="no"></iframe>
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
