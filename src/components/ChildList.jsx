import React from 'react';
import {StyleSheet, FlatList, SafeAreaView} from "react-native";
import ChildItem from "./ChildItem";

const ChildList = ({children, navigation, onRefresh, refreshing}) => {
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                onRefresh={onRefresh}
                refreshing={refreshing}
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
        alignItems: 'center',
        justifyContent: 'center',
    }
})