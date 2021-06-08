import { useNavigation } from '@react-navigation/core';
import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { MainText } from '../Core/MainText';



export function Home() {
    const navigation = useNavigation()
    return (
        <ImageBackground source={require('../assets/homeBackground.png')} style={styles.container}>
            <View style={{ flex: .4, justifyContent: 'center', alignContent: 'center' }}>
                <MainText style={{ fontSize: 55, textAlign: 'center' }}>Sweet Bash!</MainText>
            </View>
            <View style={{ flex: .6 }}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('GameScreen')}>
                    <MainText style={{ fontSize: 20, textAlign: 'center' }}>New Game</MainText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ScoreChart')}>
                    <MainText style={{ fontSize: 20, textAlign: 'center' }}>Scoreboard</MainText>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    },
    button: {
        backgroundColor: 'pink',
        width: '40%',
        marginRight: 'auto',
        marginLeft: 'auto',
        padding: 15,
        borderRadius: 10,
        marginTop: 15
    }
});