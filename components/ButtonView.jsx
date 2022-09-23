import React from 'react';
import {Button, View} from "react-native";

const ButtonView = ({style, title, onPress}) => {
    return (
        <View style={style}>
            <Button title={title} onPress={onPress}></Button>
        </View>
    );
};

export default ButtonView;