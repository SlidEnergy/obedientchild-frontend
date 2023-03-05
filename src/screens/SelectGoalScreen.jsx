import React, {useEffect, useState} from 'react';
import ChildList from "../components/ChildList";
import {ActivityIndicator, Alert, Button, Image, Text, TouchableOpacity, View} from "react-native";
import {http} from "../core/http-common";
import RewardList from "../components/RewardList";
import LoadingIndicator from "../components/LoadingIndicator";

const SelectGoalScreen = ({route, navigation}) => {
    const [rewards, setRewards] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const child = route.params;

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

    function onChoose(item) {
        console.log(JSON.stringify(item));
        http.post(`/children/${child.id}/setgoal`, item.id)
            .then(({data}) => {
                Alert.alert("Success", "success");
                navigation.navigate("Child", child);
            })
            .catch(err => {
                console.log(err);
                Alert.alert("Error", err);
            });
    }

    return (
        <View style={{
            alignItems: "center",
            alignContent: "center",
            flexDirection: "column",
            height: "100%",
            width: "100%",
            padding: 0
        }}>
            <LoadingIndicator isLoading={isLoading}></LoadingIndicator>
            <RewardList rewards={rewards} navigation={navigation} onChoose={onChoose}>
            </RewardList>
        </View>
    );
};

export default SelectGoalScreen;
