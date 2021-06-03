import React, { Component, useEffect, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

export function LosingAnimation() {
    const animationRef = useRef<null | LottieView>(null)
    useEffect(() => {
        animationRef.current && animationRef.current.play();
    })
    return (
        <LottieView
            ref={animationRef}
            style={styles.container}
            source={require('../assets/animations/losing.json')}
        />
    )
}


const styles = StyleSheet.create({
    container: {
        width: 170,
        height: 170
    }
});