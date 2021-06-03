import React, { Component, useContext, useState } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { LosingAnimation } from '../Animations/LosingAnimation';
import { MainText } from '../Core/MainText';
import { usePlaySound } from '../hooks/usePlaySound';
import MainContext from '../shared/context';
import { LoadingScreen } from './LoadingScreen';

export function LosingScreen() {
    const mainContext = useContext(MainContext)
    const [loading, setLoading] = useState<boolean>(false)
    usePlaySound(true, require('../assets/sounds/loseScreenSound.mp3'))

    const retry = () => {
        setLoading(true)
        mainContext.resetGame()
    }
    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <LosingAnimation />
                <MainText style={{ fontSize: 22, color: 'black' }}>Time's up!</MainText>
                <MainText style={{ fontSize: 22, color: 'black' }}>You reached a total score of</MainText>
                <MainText style={{ fontSize: 22, color: 'black' }}>{mainContext.currentScore}</MainText>
                {loading ? <LoadingScreen scale={.5} /> :
                    <TouchableOpacity style={{ paddingTop: 20 }} onPress={() => retry()}>
                        <MainText style={{ fontSize: 27, color: 'black' }}>Retry!</MainText>
                    </TouchableOpacity>}
                <Image source={require('../assets/losingCloud.png')} style={styles.innerImage} />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        zIndex: 20,
        elevation: 20,
        flex: 1
    },
    innerContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: Dimensions.get('window').height / 5,
        marginRight: 'auto',
        marginLeft: 'auto',
        width: Dimensions.get('window').width / 1.1,
        height: Dimensions.get('window').height / 2.3,
    },
    innerImage: {
        position: 'absolute',
        zIndex: -1,
        transform: [{ scale: 1.5 }]
    }
});