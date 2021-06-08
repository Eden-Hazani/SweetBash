import React, { Component, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { Home } from '../Screens/Home';
import { GameScreen } from '../Screens/GameScreen';
import { NavigationContainer } from '@react-navigation/native';
import { ScoreChart } from '../Screens/ScoreChart';
import { upToBottom, rightToLeft } from './cardStyles';


const Stack = createStackNavigator();


export function AppNavigation() {
    return (
        <NavigationContainer >
            <Stack.Navigator screenOptions={{
                transitionSpec: { open: { config: { duration: 500 }, animation: 'timing' }, close: { config: { duration: 500 }, animation: 'timing' } }
            }}>

                <Stack.Screen options={{ headerShown: false, }} name="Home" component={Home} />

                <Stack.Screen listeners={({ navigation }) => ({ blur: () => navigation.setParams({ screen: undefined }) })}
                    options={{
                        headerShown: false,
                        cardStyleInterpolator: ({ current, layouts }) => upToBottom(current, layouts)
                    }} name="GameScreen" component={GameScreen} />


                <Stack.Screen listeners={({ navigation }) => ({ blur: () => navigation.setParams({ screen: undefined }) })}
                    options={{
                        headerShown: false,
                        cardStyleInterpolator: ({ current, layouts }) => rightToLeft(current, layouts)
                    }} name="ScoreChart" component={ScoreChart} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}


const styles = StyleSheet.create({
    container: {

    }
});