import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { WaveJar } from './WaveJar';

interface Props {
    scale: number
}

export function LoadingScreen({ scale }: Props) {
    return (
        <View style={[styles.container, { transform: [{ scale }] }]}>
            <WaveJar />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
    }
});