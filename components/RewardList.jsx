import React from 'react';
import {StyleSheet, FlatList, SafeAreaView} from "react-native";
import ChildItem from "./ChildItem";
import RewardItem from "./RewardItem";

const RewardList = ({rewards, navigation, onChoose}) => {
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={rewards}
                renderItem={(item) => <RewardItem reward={item.item} navigation={navigation} onChoose={onChoose}></RewardItem>}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    );
};

export default RewardList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
    }
})