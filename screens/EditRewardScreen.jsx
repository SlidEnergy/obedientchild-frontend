import React, {useState} from 'react';
import {
    ActivityIndicator,
    Alert,
    Button,
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import {http} from "../core/http-common";

const EditRewardScreen = ({route, navigation}) => {

    const reward = route.params;

    function deleteReward() {
        http.delete("/rewards/" + reward.id)
            .then(() => {
                Alert.alert("Success", "success");
                navigation.navigate("Rewards");
            })
            .catch(err => {
                console.log(err);
                Alert.alert("Error", err);
            });
    }

    return (
        <View>
            <View style={{
                flexDirection: "row"
            }}>
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
                    <Text style={{
                        fontSize: 24
                    }}>{reward.title}</Text>
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
            </View>
            <Button title="удалить" onPress={deleteReward}></Button>
        </View>
    );
};

export default EditRewardScreen;