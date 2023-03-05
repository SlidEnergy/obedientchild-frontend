import React, {useEffect} from 'react';
import {StyleSheet, StatusBar, Text, TouchableOpacity, Image, View} from "react-native";
import Coins from "./Coins";

const RewardItem = ({reward, onChoose}) => {
    function chooseItem() {
        onChoose && onChoose(reward);
    }

    return (
        <TouchableOpacity onPress={chooseItem} style={styles.item}>
            <Image style={{
                width: 105,
                height: 105,
                marginRight: 20,
                borderRadius: 10
            }}
                   source={{
                       uri: reward.imageUrl
                   }}></Image>
            <View style={{
                flexDirection: "column",
                flex: 1
            }}>
                <Text style={styles.title}>{reward.title}</Text>
                <Coins count={reward.price} size={22}></Coins>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    item: {
        marginVertical: 8,
        flexDirection: "row",
        alignItems: "center",
    },
    title: {
        fontSize: 22,
        marginBottom: 10
    },
    balance: {
        fontSize: 12,
    },
});

export default RewardItem;