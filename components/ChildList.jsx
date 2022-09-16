import React from 'react';
import {StyleSheet, FlatList, SafeAreaView} from "react-native";
import ChildItem from "./ChildItem";

const ChildList = ({children, navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={children}
                renderItem={(item) => <ChildItem child={item.item} navigation={navigation}></ChildItem>}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    );
};

export default ChildList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
})