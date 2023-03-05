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

const EditBadDeedScreen = ({route, navigation}) => {

    const badDeed = route.params;

    function deleteReward() {
        http.delete("/baddeeds/" + badDeed.id)
            .then(() => {
                Alert.alert("Success", "success");
                navigation.navigate("BadDeeds");
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
                           uri: badDeed.imageUrl
                       }}></Image>
                <View style={{
                    flexDirection: "column"
                }}>
                    <Text style={{
                        fontSize: 24
                    }}>{badDeed.title}</Text>
                    <View style={{
                        flexDirection: "row"
                    }}>
                        <Coins count={badDeed.price} size={22}></Coins>
                    </View>
                </View>
            </View>
            <Button title="удалить" onPress={deleteReward}></Button>
        </View>
    );
};

export default EditBadDeedScreen;
