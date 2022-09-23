import React, {useEffect} from 'react';
import {StyleSheet, StatusBar, Text, TouchableOpacity, Image, View} from "react-native";

const RewardItem = ({reward, onChoose}) => {
    function chooseItem() {
        onChoose && onChoose(reward);
    }

    return (
        <TouchableOpacity onPress={chooseItem} style={styles.item}>
            <Image style={{
                width: 105,
                height: 105,
                marginRight: 30,
                borderRadius: 10
            }}
                   source={{
                       uri: reward.imageUrl
                   }}></Image>
            <View style={{
                flexDirection: "column"
            }}>
                <Text style={styles.title}>{reward.title}</Text>
                <View style={{
                    flexDirection: "row"
                }}>
                    {Array.from(Array(reward.price), (e, i) => {
                        return <Image key={i} style={{
                            width: 22,
                            height: 22,
                            marginRight: 10,
                            marginBottom: 10
                        }}
                                      source={require('../assets/coin.png')}
                        />
                    })}
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
    },
    title: {
        fontSize: 32,
    },
    balance: {
        fontSize: 12,
    },
});

export default RewardItem;