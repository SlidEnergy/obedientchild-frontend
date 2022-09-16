import React from 'react';
import {StyleSheet, Button, ScrollView, Text} from "react-native";

const ChildList = (props) => {

    function selectChild(child) {

    }

    return (
        <ScrollView contentContainerStyle={styles.scrollView}>
            {props.children && props.children.map(child =>
                <Button key={child} style={styles.button} title={child} onPress={selectChild(child)} />
            )}
        </ScrollView>
    );
};

export default ChildList;

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        margin: 20
    }
})