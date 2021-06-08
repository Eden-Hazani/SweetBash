import { useNavigation } from '@react-navigation/core';
import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, ImageBackground, Dimensions, TouchableOpacity, } from 'react-native';
import { LevelUpAnimation } from '../Animations/LevelUpAnimation';
import { GameMenu } from '../Components/GameMenu';
import ScoreBoard from '../Components/ScoreBoard';
import SwappableGrid from '../Components/SwappableGrid';
import MainContext from '../shared/context';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { saveGame } from '../Utility/saveCurrentGame';



export function GameScreen() {
    const navigation = useNavigation()
    const mainContext = useContext(MainContext)
    const [stopTimer, setStopTimer] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false)



    useEffect(() => {
        const unsubscribeBack = navigation.addListener('beforeRemove', (e) => {
            if (!stopTimer) {
                e.preventDefault();
                openMenu()
                return
            }
            saveGame(mainContext.currentScore, mainContext.currentLevel)
            mainContext.resetGame()
            unsubscribeBack()
        })
        return () => unsubscribeBack()
    }, [stopTimer])

    const openMenu = () => {
        setStopTimer(true)
        setMenuOpen(true)
    }

    const closeMenu = () => {
        setStopTimer(false)
        setMenuOpen(false)
    }

    const leave = () => {
        saveGame(mainContext.currentScore, mainContext.currentLevel)
        mainContext.resetGame()
        navigation.goBack()
    }


    return (
        <View style={styles.container}>
            <ImageBackground style={styles.backImg} source={require('../assets/backgroundScreen.png')}>
                <TouchableOpacity style={styles.menuButton} onPress={() => openMenu()}>
                    <MaterialCommunityIcons name={'close'} color={'black'} size={45} />
                </TouchableOpacity>
                {menuOpen && <GameMenu closeMenu={() => closeMenu()} allowGoBack={() => leave()} />}
                <ScoreBoard stopTimer={stopTimer} />
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
    },
    menuButton: {
        position: 'absolute',
        top: '3%'
    }
});