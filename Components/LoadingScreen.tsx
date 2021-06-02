import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { WaveJar } from './WaveJar';

export function LoadingScreen() {
    return (
        <View style={styles.container}>
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