import React, {useEffect} from 'react';
import {Text, View} from "react-native";

const ChildScreen = ({route, navigation}) => {
    useEffect(() => {
        navigation.setOptions({
            title: child
        })
    })

    const child = route.params;
    return (
        <View>
        </View>
    );
};

export default ChildScreen;