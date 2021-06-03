import React, { Component, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { Home } from '../Screens/Home';
import { GameScreen } from '../Screens/GameScreen';
import { NavigationContainer } from '@react-navigation/native';


const Stack = createStackNavigator();


export function AppNavigation() {
    return (
        <NavigationContainer >
            <Stack.Navigator screenOptions={{
                transitionSpec: { open: { config: { duration: 750 }, animation: 'timing' }, close: { config: { duration: 750 }, animation: 'timing' } },
                cardStyleInterpolator: ({ current, layouts }) => {
                    return {
                        cardStyle: {
                            transform: [
                                {
                                    translateY: current.progress.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [-layouts.screen.height, 1],
                                    }),
                                },
                            ],
                        }
                    }
                }
            }}>
                <Stack.Screen options={{
                    headerShown: false,
                }} name="Home" component={Home} />
                <Stack.Screen listeners={({ navigation }) => ({ blur: () => navigation.setParams({ screen: undefined }) })} options={{ headerShown: false }} name="GameScreen" component={GameScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}


const styles = StyleSheet.create({
    container: {

    }
});