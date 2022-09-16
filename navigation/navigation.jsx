import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import ChildScreen from "../screens/ChildScreen";

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} options={{title: "Home"}}></Stack.Screen>
                <Stack.Screen name="Child" component={ChildScreen} options={{title: "Child"}}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;