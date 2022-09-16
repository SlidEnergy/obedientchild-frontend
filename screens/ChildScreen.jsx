import React, {useEffect} from 'react';
import {Image, Text, View} from "react-native";

const ChildScreen = ({route, navigation}) => {
    useEffect(() => {
        navigation.setOptions({
            title: child.name
        })
    })

    const child = route.params;
    const url = "https://d9f2-91-245-142-214.eu.ngrok.io/api/v1/children/" + route.params.id + "/avatar.png";
    return (
        <View>
            <Image style={{width: 100, height: 180}}
                   source={{
                       uri: url
                   }}
            />
        </View>
    );
};

export default ChildScreen;