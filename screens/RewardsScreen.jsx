import React, {useEffect, useState} from 'react';
import ChildList from "../components/ChildList";
import {ActivityIndicator, Alert, Button, Image, Text, View} from "react-native";
import {http} from "../core/http-common";
import RewardList from "../components/RewardList";

const RewardsScreen = ({navigation}) => {
    const [rewards, setRewards] = useState();
    const [isLoading, setIsLoading] = useState(true);

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
            alignItems: "center",
            alignContent: "center",
            flexDirection: "column"
        }}>
            <View style={{
                height: 300,
                marginBottom: 20
            }}>
                {isLoading && <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <ActivityIndicator size="large"></ActivityIndicator>
                    <Text style={{
                        marginTop: 15
                    }}>Loading...</Text>
                </View>}
                <RewardList rewards={rewards} navigation={navigation}>
                </RewardList>
            </View>

            <Button title="Добавить" onPress={addReward}></Button>
        </View>
    );
};

export default RewardsScreen;