import React, {useEffect, useState} from 'react';
import ChildList from "../components/ChildList";
import {ActivityIndicator, Alert, Button, Image, Text, View} from "react-native";
import {http} from "../core/http-common";

const HomeScreen = ({navigation}) => {
    const [children, setChildren] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        http.get("/children")
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
        <View style={{
            flexDirection: "column",
            height: 300
        }}>
            <ChildList children={children} navigation={navigation}>
            </ChildList>
            <Button title="Награды" onPress={() => navigation.navigate("Rewards")}></Button>
        </View>
    );
};

export default HomeScreen;