import React, {useEffect} from 'react';
import {StyleSheet, StatusBar, Text, TouchableOpacity} from "react-native";

const ChildItem = ({child, navigation}) => {
    function selectChild() {
        navigation.navigate("Child", child);
    }

    return (
        <TouchableOpacity onPress={selectChild} style={styles.item}>
            <Text style={styles.title}>{child}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});

export default ChildItem;