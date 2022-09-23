import React from 'react';
import {Image, View} from "react-native";

const Coins = ({count}) => {
    return (
        <View style={{
            flex: 1,
            flexDirection: "row",
            flexWrap: "wrap"
        }}>
            {Array.from(Array(count || 0), (e, i) => {
                return <Image key={i} style={{
                    width: 36,
                    height: 36,
                    marginRight: 10,
                    marginBottom: 10
                }}
                              source={require('../assets/coin.png')}
                />
            })}
        </View>
    );
};

export default Coins;