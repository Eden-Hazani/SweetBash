import React, { Component, useContext, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { MainText } from '../Core/MainText';
import MainContext from '../shared/context';
import { LoadingScreen } from './LoadingScreen';

interface Props {
    allowGoBack: Function
    closeMenu: Function
}

export function GameMenu({ allowGoBack, closeMenu }: Props) {
    const mainContext = useContext(MainContext)
    const [loading, setLoading] = useState(false)


    const resetGame = () => {
        setLoading(true)
        mainContext.resetGame()
        setTimeout(() => {
            setLoading(false)
            closeMenu()
        }, 250);
    }

    return (
        <View style={styles.menu}>
            <View style={styles.innerMenu}>
                <TouchableOpacity style={styles.menuButton} onPress={() => closeMenu()}>
                    <MaterialCommunityIcons name={'close'} color={'black'} size={30} />
                </TouchableOpacity>
                <MainText style={{ fontSize: 40, paddingBottom: 40 }}>Menu</MainText>
                {loading ? <LoadingScreen scale={.5} /> :
                    <>
                        <TouchableOpacity style={styles.button} onPress={() => resetGame()}>
                            <MainText style={{ fontSize: 30 }}>Replay</MainText>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => allowGoBack()}>
                            <MainText style={{ fontSize: 30 }}>Exit</MainText>
                        </TouchableOpacity>
                    </>
                }
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    menu: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 20,
        backgroundColor: 'rgba(255,0,0,0.1)'
    },
    innerMenu: {
        backgroundColor: 'white',
        height: Dimensions.get('window').height / 3,
        width: Dimensions.get('window').width / 1.5,
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 15
    },
    button: {
        marginBottom: 15,
        backgroundColor: 'pink',
        padding: 5,
        paddingLeft: 35,
        paddingRight: 35,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'black'
    },
    menuButton: {
        position: 'absolute',
        left: 0
    }
});