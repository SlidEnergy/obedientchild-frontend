import React, {useEffect} from 'react';
import {StyleSheet, StatusBar, Text, TouchableOpacity, Image} from "react-native";

const ChildItem = ({child, navigation}) => {
    function selectChild() {
        navigation.navigate("Child", child);
    }

    return (
        <TouchableOpacity onPress={selectChild} style={styles.item}>
            <Image style={{
                width: 30,
                height: 60,
                marginRight: 30,
                borderRadius: 10
            }}
            source={{
                uri: child.avatar
            }}></Image>
            <Text style={styles.title}>{child.name}</Text>
            <Text style={styles.balance}>{child.balance + "/" + child.bigGoalBalance + "/" + child.dreamBalance}</Text>
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
});

export default ChildItem;