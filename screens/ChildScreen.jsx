import React, {useEffect, useState} from 'react';
import {Alert, Button, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {http} from "../core/http-common";
import LoadingIndicator from "../components/LoadingIndicator";
import Coins from "../components/Coins";
import ButtonView from "../components/ButtonView";
import RewardList from "../components/RewardList";
import RewardItem from "../components/RewardItem";

const ChildScreen = ({route, navigation}) => {
    const [child, setChild] = useState({
        id: route.params.id,
        name: route.params.name,
        avatar: route.params.avatar,
        bigGoalId: route.params.bigGoalId,
        dreamId: route.params.dreamId
    });

    const [isLoading, setIsLoading] = useState(true);

    const [bigGoal, setBigGoal] = useState();
    const [dream, setDream] = useState();

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

        if (child.bigGoalId) {
            http.get("/rewards/" + child.bigGoalId)
                .then(({data}) => {
                    setBigGoal(data);
                })
                .catch(err => {
                    console.log(err);
                    Alert.alert("Error", err.message);
                });
        }

        if (child.dreamId) {
            http.get("/rewards/" + child.dreamId)
                .then(({data}) => {
                    setDream(data);
                })
                .catch(err => {
                    console.log(err);
                    Alert.alert("Error", err.message);
                });
        }
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

    function selectDream() {
        navigation.navigate("SelectDream", child);
    }

    //const url = "https://d9f2-91-245-142-214.eu.ngrok.io/api/v1/children/" + route.params.id + "/avatar.png";
    return (
        <View style={{
            padding: 20,
        }}>
            <ScrollView>
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
                    <Text style={styles.h2}>Большая цель</Text>
                    {bigGoal && <RewardItem reward={bigGoal}></RewardItem>}
                    <ButtonView style={{marginTop: 20}} title="Выбрать цель" onPress={selectGoal}></ButtonView>
                </View>
                <View>
                    <Text style={styles.h2}>Мечта</Text>
                    {dream && <RewardItem reward={dream}></RewardItem>}
                    <ButtonView style={{marginTop: 20}} title="Выбрать Мечту" onPress={selectDream}></ButtonView>
                </View>
            </ScrollView>
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
    },
    h2: {
        fontSize: 24
    }
}

export default ChildScreen;