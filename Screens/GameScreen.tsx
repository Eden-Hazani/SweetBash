import { useNavigation } from '@react-navigation/core';
import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LevelUpAnimation } from '../Animations/LevelUpAnimation';
import { GameMenu } from '../Components/GameMenu';
import ScoreBoard from '../Components/ScoreBoard';
import SwappableGrid from '../Components/SwappableGrid';
import MainContext from '../shared/context';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { saveGame } from '../Utility/saveCurrentGame';
import { GameBackground } from '../Components/GameBackground';
import { TutorialModel } from '../TutorialModels/TutorialModel';



export function GameScreen() {
    const navigation = useNavigation()
    const mainContext = useContext(MainContext)
    const [menuOpen, setMenuOpen] = useState(false)



    useEffect(() => {
        const unsubscribeBack = navigation.addListener('beforeRemove', (e) => {
            if (!mainContext.timerStatus) {
                e.preventDefault();
                openMenu()
                return
            }
            saveGame(mainContext.currentScore, mainContext.currentLevel)
            mainContext.resetGame()
            unsubscribeBack()
        })
        return () => unsubscribeBack()
    }, [mainContext.timerStatus])

    const openMenu = () => {
        mainContext.stopTimer(true)
        setMenuOpen(true)
    }

    const closeMenu = () => {
        mainContext.stopTimer(false)
        setMenuOpen(false)
    }

    const leave = () => {
        saveGame(mainContext.currentScore, mainContext.currentLevel)
        mainContext.resetGame()
        navigation.goBack()
    }


    return (
        <View style={styles.container}>
            <GameBackground />
            <TouchableOpacity style={styles.menuButton} onPress={() => openMenu()}>
                <MaterialCommunityIcons name={'close'} color={'black'} size={45} />
            </TouchableOpacity>
            {menuOpen && <GameMenu closeMenu={() => closeMenu()} allowGoBack={() => leave()} />}
            <ScoreBoard />
            <LevelUpAnimation />
            <SwappableGrid />
            <TutorialModel />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    menuButton: {
        position: 'absolute',
        top: '3%'
    }
});