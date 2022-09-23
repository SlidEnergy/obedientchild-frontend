import React from 'react';
import {ActivityIndicator, Text, View} from "react-native";

const LoadingIndicator = ({isLoading}) => {
    if (isLoading) {
        return <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <ActivityIndicator size="large"></ActivityIndicator>
            <Text style={{
                marginTop: 15
            }}>Loading...</Text>
        </View>
    }

    return <View></View>;
};

export default LoadingIndicator;