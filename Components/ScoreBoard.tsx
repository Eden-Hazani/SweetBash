import React, { Component, useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, Animated } from 'react-native';
import MainContext from '../shared/context';
import * as Progress from 'react-native-progress';
import { currentProgress, goalCalculator } from '../Utility/scoreLogic';
import { MainText } from '../Core/MainText';
import { usePlaySound } from '../hooks/usePlaySound';
import { soundEmitter } from '../functions/soundEmitter';
import { Timer } from './Timer';
import { LosingScreen } from './LosingScreen';



const ScoreBoard = () => {
    const mainContext = useContext(MainContext)
    const [passedLevelScore, setPassedLevelScore] = useState(0)
    const [losingScreen, setLosingScreen] = useState(false)
    usePlaySound(mainContext.currentScore, soundEmitter(mainContext.currentSound))
    usePlaySound(mainContext.currentScore - passedLevelScore >= mainContext.currentGoal, require('../assets/sounds/levelUp.mp3'))

    useEffect(() => {
        if (mainContext.currentScore - passedLevelScore >= mainContext.currentGoal) {
            mainContext.levelUp()
            setPassedLevelScore(mainContext.currentScore)
        }
    }, [mainContext.currentScore])

    useEffect(() => {
        if (mainContext.currentScore === 0) {
            setPassedLevelScore(0)
        }
    }, [mainContext.resetGame])

    return (
        <View style={styles.container}>
            <View style={styles.jarContainer}>
                <Animated.Image style={[styles.jarImage, mainContext.jarLocation.getLayout(), {
                    transform: [{
                        rotate: mainContext.jarRotation.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0deg', '15deg']
                        })
                    }]
                }]} source={require('../assets/candyJar.png')} />
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <View>
                        <MainText style={{ fontSize: 20 }}>Current Score</MainText>
                        <MainText style={{ fontSize: 15 }}>Total score: {mainContext.currentScore}</MainText>
                        <Progress.Bar color={'pink'} progress={currentProgress(mainContext.currentScore, mainContext.currentGoal, passedLevelScore)} width={200} />
                    </View>
                    <Timer returnLoss={(val: boolean) => setLosingScreen(val)} />
                </View>
            </View>
            <View>
                <MainText style={{ fontSize: 22, textAlign: 'center' }}>Level {mainContext.currentLevel}</MainText>
            </View>
            {losingScreen && <LosingScreen />}
        </View>
    )
}

export default ScoreBoard


const styles = StyleSheet.create({
    container: {
        paddingTop: '15%',
    },
    jarImage: {
        width: 120,
        height: 120,
        zIndex: 50,
    },
    jarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    }
});