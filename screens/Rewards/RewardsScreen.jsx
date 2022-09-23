import React, {useEffect, useState} from 'react';
import ChildList from "../../components/ChildList";
import {ActivityIndicator, Alert, Button, Image, Text, TouchableOpacity, View} from "react-native";
import {http} from "../../core/http-common";
import RewardList from "../../components/RewardList";
import LoadingIndicator from "../../components/LoadingIndicator";

const RewardsScreen = ({navigation}) => {
    const [rewards, setRewards] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => <TouchableOpacity onPress={addReward}>
                <Text style={{
                    fontSize: 32
                }}>+</Text>
            </TouchableOpacity>
        })
    }, []);

    useEffect(() => {
        setIsLoading(true);
        http.get("/rewards")
            .then(({data}) => {
                setRewards(data);
            })
            .catch(err => {
                console.log(err);
                Alert.alert("Error", err);
            })
            .finally(() => setIsLoading(false));
    }, []);

    function addReward() {
        navigation.navigate("AddReward");
    }

    function onChoose(item) {
        navigation.navigate("EditReward", item);
    }

    if (isLoading) {
        return <LoadingIndicator isLoading={isLoading}></LoadingIndicator>;
    }

    return (
        <View style={{
            alignItems: "center",
            alignContent: "center",
            flexDirection: "column",
            height: "100%",
            width: "100%",
            padding: 20
        }}>
            <LoadingIndicator isLoading={isLoading}></LoadingIndicator>
            <RewardList rewards={rewards} navigation={navigation} onChoose={onChoose}>
            </RewardList>
        </View>
    );
};

export default RewardsScreen;