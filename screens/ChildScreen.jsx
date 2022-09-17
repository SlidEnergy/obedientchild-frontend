import React, {useEffect, useState} from 'react';
import {Alert, Button, Image, Text, TouchableOpacity, View} from "react-native";
import axios from "axios";

const ChildScreen = ({route, navigation}) => {
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        navigation.setOptions({
            title: child.name
        });
        setBalance(child.balance);
    }, [])

    function spendCoin(count) {
        axios.post("https://9548-91-245-142-214.eu.ngrok.io/api/v1/children/" + child.id + "/spend/" + count)
            .then(({data}) => setBalance(data))
            .catch(err => {
                console.log(err);
                Alert.alert("Error", err);
            });
    }

    function earnCoin(count) {
        axios.post("https://9548-91-245-142-214.eu.ngrok.io/api/v1/children/" + child.id + "/earn/" + count)
            .then(({data}) => setBalance(data))
            .catch(err => {
                console.log(err);
                Alert.alert("Error", err);
            });
    }

    const child = route.params;
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
                <View style={{
                    flex: 1,
                    flexDirection: "row",
                    flexWrap: "wrap"
                }}>
                    {Array.from(Array(balance), (e, i) => {
                        return <Image key={i} style={{
                            width: 36,
                            height: 36,
                            marginRight: 10,
                            marginBottom: 10
                        }}
                                      source={require('../assets/coin.png')}
                        />
                    })}
                </View>
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