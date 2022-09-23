import React, {useState} from 'react';
import {
    ActivityIndicator,
    Alert,
    Button,
    Image,
    ScrollView, StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import {http} from "../../core/http-common";
import ButtonView from "../../components/ButtonView";
import Coins from "../../components/Coins";

const EditRewardScreen = ({route, navigation}) => {
    const [reward, setReward] = useState(route.params);

    function deleteReward() {
        http.delete("/rewards/" + reward.id)
            .then(() => {
                Alert.alert("Success", "success");
                navigation.navigate("Rewards");
            })
            .catch(err => {
                console.log(err);
                Alert.alert("Error", err.message);
            });
    }

    function saveReward() {
        http.post("/rewards/" + reward.id, reward)
            .then(() => {
                Alert.alert("Success", "success");
                navigation.navigate("Rewards");
            })
            .catch(err => {
                console.log(err);
                Alert.alert("Error", err.message);
            });
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.row}>
                    <Image style={{
                        width: 105,
                        height: 105,
                        marginRight: 20,
                        borderRadius: 10
                    }}
                           source={{
                               uri: reward.imageUrl
                           }}></Image>
                    <View style={styles.column}>
                        <TextInput style={{
                            fontSize: 24,
                            marginBottom: 10
                        }} value={reward.title}
                                   onChangeText={(text) => setReward({...reward, title: text})}></TextInput>
                        <Coins count={reward.price} size={22}></Coins>
                    </View>
                </View>
                <ButtonView style={styles.button} title="Сохранить" onPress={saveReward}></ButtonView>
                <ButtonView style={styles.button} title="удалить" onPress={deleteReward}></ButtonView>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flexDirection: "column",
    },
    row: {
        flexDirection: "row",
        flex: 1
    },
    column: {
        flexDirection: "column",
        flex: 1
    },
    button: {
        marginTop: 20,
    }
});

export default EditRewardScreen;