import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { MainText } from '../../Core/MainText';

interface Props {
    title: string
}

export function ScoreChartHeader({ title }: Props) {
    return (
        <ImageBackground source={require('../../assets/losingCloud.png')} style={styles.container}>
            <MainText style={{ fontSize: 40 }}>{title}</MainText>
        </ImageBackground>
    )
}


const styles = StyleSheet.create({
    container: {
        transform: [{ scale: .8 }],
        height: 180,
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center',
    }
});