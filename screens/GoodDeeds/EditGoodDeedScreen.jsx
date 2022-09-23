import React from 'react';
import {
    Alert,
    Button,
    Image,
    Text,
    View
} from "react-native";
import {http} from "../../core/http-common";
import Coins from "../../components/Coins";

const EditGoodDeedScreen = ({route, navigation}) => {

    const goodDeed = route.params;

    function deleteReward() {
        http.delete("/gooddeeds/" + goodDeed.id)
            .then(() => {
                Alert.alert("Success", "success");
                navigation.navigate("GoodDeeds");
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
                           uri: goodDeed.imageUrl
                       }}></Image>
                <View style={{
                    flexDirection: "column"
                }}>
                    <Text style={{
                        fontSize: 24
                    }}>{goodDeed.title}</Text>
                    <View style={{
                        flexDirection: "row"
                    }}>
                        <Coins count={goodDeed.price} size={22}></Coins>
                    </View>
                </View>
            </View>
            <Button title="удалить" onPress={deleteReward}></Button>
        </View>
    );
};

export default EditGoodDeedScreen;