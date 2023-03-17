import React from 'react';
import PropTypes from 'prop-types';
import {useNavigate} from 'react-router-dom';

const ChildItem = props => {
    const child = props.child
    const navigate = useNavigate();

    function selectChild() {
        navigate(`/children/${child.id}`);
    }

    return (
        <div style={{cursor: 'pointer'}} onClick={selectChild}>
            <img style={{
                width: 160,
                height: 240,
                marginRight: 30,
                borderRadius: 10
            }}
                 src={child.avatar}></img>
            <p style={styles.title}>{child.name}</p>
            <p style={styles.balance}>{child.balance + "/" + child.bigGoalBalance + "/" + child.dreamBalance}</p>
        </div>
    );
};

ChildItem.propTypes = {
    child: PropTypes.any
};

const styles = {
    container: {
        flex: 1,
        marginTop: 10,
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center"
    },
    title: {
        fontSize: 32,
        marginRight: 20
    },
    balance: {
        fontSize: 12,
    },
};

export default ChildItem;
