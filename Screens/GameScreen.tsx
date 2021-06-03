import { useNavigation } from '@react-navigation/core';
import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, ImageBackground, Dimensions, } from 'react-native';
import { LevelUpAnimation } from '../Animations/LevelUpAnimation';
import { GameMenu } from '../Components/GameMenu';
import ScoreBoard from '../Components/ScoreBoard';
import SwappableGrid from '../Components/SwappableGrid';
import MainContext from '../shared/context';



export function GameScreen() {
    const navigation = useNavigation()
    const mainContext = useContext(MainContext)

    const blockBack = navigation.addListener('beforeRemove', (e) => {
        e.preventDefault();
    })

    useEffect(() => {
        blockBack()
    })

    const leaveGame = () => {
        blockBack()
        navigation.goBack()
        mainContext.resetGame()
    }

    return (
        <View style={styles.container}>
            <ImageBackground style={styles.backImg} source={require('../assets/backgroundScreen.png')}>
                <GameMenu allowGoBack={() => leaveGame()} />
                <ScoreBoard />
                <LevelUpAnimation />
                <SwappableGrid />
            </ImageBackground>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backImg: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
    }
});