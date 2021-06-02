import React, { useContext, useState } from 'react';
import { View, StyleSheet, ImageBackground, Dimensions, } from 'react-native';
import { LevelUpAnimation } from '../Animations/LevelUpAnimation';
import ScoreBoard from '../Components/ScoreBoard';
import { SwappableGrid } from '../Components/SwappableGrid';
import MainContext from '../shared/context';

export function GameScreen() {
    return (
        <View style={styles.container}>
            <ImageBackground style={styles.backImg} source={require('../assets/backgroundScreen.png')}>
                <ScoreBoard />
                {<LevelUpAnimation />}
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