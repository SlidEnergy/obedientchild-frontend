import React, {useEffect, useState} from 'react';
import {Alert, Button, Image, Text, TouchableOpacity, View} from "react-native";
import {http} from "../core/http-common";
import LoadingIndicator from "../components/LoadingIndicator";
import Coins from "../components/Coins";

const ChildScreen = ({route, navigation}) => {
    const [child, setChild] = useState({ id: route.params.id, name: route.params.name, avatar: route.params.avatar });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        navigation.setOptions({
            title: child.name
        });

        setIsLoading(true);
        http.get("/children/" + child.id)
            .then(({data}) => {
                setChild(data);
            })
            .catch(err => {
                console.log(err);
                Alert.alert("Error", err.message);
            })
            .finally(() => setIsLoading(false));

    }, [])

    function spendCoin(count) {
        http.post("/children/" + child.id + "/spend/" + count)
            .then(({data}) => setChild({...child, balance: data}))
            .catch(err => {
                console.log(err);
                Alert.alert("Error", err.message);
            });
    }

    function earnCoin(count) {
        http.post("/children/" + child.id + "/earn/" + count)
            .then(({data}) => setChild({...child, balance: data}))
            .catch(err => {
                console.log(err);
                Alert.alert("Error", err.message);
            });
    }

    function selectGoal() {
        navigation.navigate("SelectGoal", child);
    }

    //const url = "https://d9f2-91-245-142-214.eu.ngrok.io/api/v1/children/" + route.params.id + "/avatar.png";
    return (
        <View style={{
            flexDirection: "column",
            padding: 20
        }}>
            <View style={{
                flexDirection: "row",
                marginBottom: 20
            }}>
                <Image style={{
                    width: 100,
                    height: 180,
                    borderRadius: 10,
                    marginRight: 20
                }}
                       source={{
                           uri: child.avatar
                       }}
                />
                <LoadingIndicator isLoading={isLoading}></LoadingIndicator>
                {!isLoading && <Coins count={child.balance}></Coins>}
            </View>
            {/*<View style={{*/}
            {/*    flexDirection: "row",*/}
            {/*    alignItems: "center",*/}
            {/*    alignContent: "center",*/}
            {/*    height: 100,*/}
            {/*    fontSize: 22*/}
            {/*}}>*/}
            {/*    <View style={{*/}
            {/*        width: 100,*/}
            {/*        marginRight: 10,*/}
            {/*        flex: 1,*/}
            {/*        fontSize: 32*/}
            {/*    }}>*/}
            {/*        <Button style={{fontSize: 32, height: 50}}*/}
            {/*                title="-" onPress={() => spendCoin(1)}></Button>*/}
            {/*    </View>*/}
            {/*    <View style={{*/}
            {/*        width: 100,*/}
            {/*        flex: 1*/}
            {/*    }}>*/}
            {/*        <Button style={{}}*/}
            {/*                title="+" onPress={() => earnCoin(1)}></Button>*/}
            {/*    </View>*/}
            {/*</View>*/}
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                alignContent: "center",
            }}>
                <TouchableOpacity style={{...styles.button, marginRight: 20}}
                                  onPress={() => spendCoin(1)}>
                    <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}
                                  onPress={() => earnCoin(1)}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            </View>
            <View style={{
                marginTop: 20
            }}>
                <Button title="Выбрать цель" onPress={selectGoal}></Button>
            </View>
        </View>
    );
};

const styles = {
    button: {
        height: 60,
        borderRadius: 2,
        alignItems: "center",
        backgroundColor: "#337ab7",
        flex: 1,
    },
    buttonText: {
        fontSize: 22,
        marginTop: 10,
        color: "white"
    }
}

export default ChildScreen;