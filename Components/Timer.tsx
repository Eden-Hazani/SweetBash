import { useNavigation } from '@react-navigation/core';
import React, { Component, useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { MainText } from '../Core/MainText';
import { useTimer } from '../hooks/useTimer';
import MainContext from '../shared/context';

interface Props {
    returnLoss: Function
}

export function Timer({ returnLoss }: Props) {
    const mainContext = useContext(MainContext);
    const navigation = useNavigation();
    useTimer(mainContext.currentFullTime, mainContext.timerStatus, navigation.isFocused());

    const currentTime = mainContext.currentTimer
    useEffect(() => {
        if (currentTime === '00:00') returnLoss(true)
        else returnLoss(false)
    }, [currentTime, mainContext.resetGame])
    return (
        <View style={styles.container}>
            <MainText style={{ fontSize: 20 }}>{currentTime}</MainText>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        right: 10
    }
});