import React, {useEffect} from 'react';
import {StyleSheet, StatusBar, Text, TouchableOpacity, Image} from "react-native";

const RewardItem = ({reward, navigation}) => {
    function selectItem() {
        navigation.navigate("Reward", reward);
    }

    return (
        <TouchableOpacity onPress={selectItem} style={styles.item}>
            <Image style={{
                width: 105,
                height: 105,
                marginRight: 30,
                borderRadius: 10
            }}
            source={{
                uri: reward.imageUrl
            }}></Image>
            <Text style={styles.title}>{reward.title}</Text>
            <Text style={styles.balance}>{reward.price}</Text>
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

export default RewardItem;