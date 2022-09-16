import React, {useEffect, useState} from 'react';
import ChildList from "../components/ChildList";
import axios from "axios";
import {ActivityIndicator, Alert, Image, Text, View} from "react-native";

const HomeScreen = ({navigation}) => {
    const [children, setChildren] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        axios.get("https://d9f2-91-245-142-214.eu.ngrok.io/api/v1/children")
            .then(({data}) => {
                setChildren(data);
            })
            .catch(err => {
                console.log(err);
                Alert.alert("Error", err);
            })
            .finally(() => setIsLoading(false));
    }, []);

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

    return (
        <ChildList children={children} navigation={navigation}>
        </ChildList>
    );
};

export default HomeScreen;