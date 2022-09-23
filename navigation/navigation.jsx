import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import ChildScreen from "../screens/ChildScreen";
import AddRewardScreen from "../screens/Rewards/AddRewardScreen";
import RewardsScreen from "../screens/Rewards/RewardsScreen";
import EditRewardScreen from "../screens/Rewards/EditRewardScreen";
import SelectGoalScreen from "../screens/SelectGoalScreen";
import GoodDeedsScreen from "../screens/GoodDeeds/GoodDeedsScreen";
import AddGoodDeedScreen from "../screens/GoodDeeds/AddGoodDeedScreen";
import EditGoodDeedScreen from "../screens/GoodDeeds/EditGoodDeedScreen";
import EditBadDeedScreen from "../screens/BadDeeds/EditBadDeedScreen";
import AddBadDeedScreen from "../screens/BadDeeds/AddBadDeedScreen";
import BadDeedsScreen from "../screens/BadDeeds/BadDeedsScreen";
import SelectDreamScreen from "../screens/SelectDreamScreen";

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} options={{title: "Home"}}></Stack.Screen>
                <Stack.Screen name="Child" component={ChildScreen} options={{title: "Ребенок"}}></Stack.Screen>

                <Stack.Screen name="Rewards" component={RewardsScreen} options={{title: "Награды"}}></Stack.Screen>
                <Stack.Screen name="AddReward" component={AddRewardScreen} options={{title: "Добавить награду"}}></Stack.Screen>
                <Stack.Screen name="EditReward" component={EditRewardScreen} options={{title: "Редактирование награды"}}></Stack.Screen>

                <Stack.Screen name="SelectGoal" component={SelectGoalScreen} options={{title: "Выбор цели"}}></Stack.Screen>
                <Stack.Screen name="SelectDream" component={SelectDreamScreen} options={{title: "Выбор мечты"}}></Stack.Screen>

                <Stack.Screen name="GoodDeeds" component={GoodDeedsScreen} options={{title: "Хорошие дела"}}></Stack.Screen>
                <Stack.Screen name="AddGoodDeed" component={AddGoodDeedScreen} options={{title: "Добавить хорошее дело"}}></Stack.Screen>
                <Stack.Screen name="EditGoodDeed" component={EditGoodDeedScreen} options={{title: "Редактировать хорошее дело"}}></Stack.Screen>

                <Stack.Screen name="BadDeeds" component={BadDeedsScreen} options={{title: "Плохие дела"}}></Stack.Screen>
                <Stack.Screen name="AddBadDeed" component={AddBadDeedScreen} options={{title: "Добавить плохое дело"}}></Stack.Screen>
                <Stack.Screen name="EditBadDeed" component={EditBadDeedScreen} options={{title: "Редактировать плохое дело"}}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;