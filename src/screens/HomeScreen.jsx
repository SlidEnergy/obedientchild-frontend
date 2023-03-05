import React, {useEffect, useState} from 'react';
import ChildList from "../components/ChildList";
import {Alert, StyleSheet, View} from "react-native";
import {http} from "../core/http-common";
import LoadingIndicator from "../components/LoadingIndicator";
import ButtonView from "../components/ButtonView";

const HomeScreen = ({navigation}) => {
    const [children, setChildren] = useState();
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        loadChildren();
    }, []);

    function loadChildren() {

        setRefreshing(true);
        http.get("/children")
            .then(({data}) => {
                setChildren(data);
            })
            .catch(err => {
                console.log(err);
                Alert.alert("Error", err.message);
            })
            .finally(() => {
                setIsLoading(false);
                setRefreshing(false);
            });
    }

    return (
        <View style={styles.container}>
            <LoadingIndicator isLoading={isLoading}></LoadingIndicator>
            {!isLoading &&
                <ChildList children={children} navigation={navigation} onRefresh={loadChildren} refreshing={refreshing}>
                </ChildList>
            }
            <View style={styles.buttonList}>
                <ButtonView style={styles.button} title="Хорошие дела" onPress={() => navigation.navigate("GoodDeeds")}></ButtonView>
                <ButtonView style={styles.button} title="Плохие дела" onPress={() => navigation.navigate("BadDeeds")}></ButtonView>
                <ButtonView style={styles.button} title="Желания" onPress={() => navigation.navigate("Rewards")}></ButtonView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 500,
    },
    buttonList: {
        padding: 20
    },
    button: {
        marginBottom: 20,
    }
});

export default HomeScreen;
