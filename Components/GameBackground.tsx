import React, { Component, useContext, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated, Dimensions, ImageURISource, Image } from 'react-native';
import gameBackScreenSwitch from '../functions/gameBackScreenSwitch';
import { sleep } from '../Lib/GridApi';
import MainContext from '../shared/context';
import { BackgroundActiveArea } from './smallComponents/BackgroundActiveArea';

export function GameBackground() {
    const mainContext = useContext(MainContext)
    const backgroundRef = useRef(new Animated.Value(0)).current
    const [currentBackground, setCurrentBackground] = useState<Animated.WithAnimatedObject<ImageURISource>>(require('../assets/backGroundLevels/level1.png'))


    useEffect(() => {
        const newBackground = gameBackScreenSwitch(mainContext.currentLevel);
        if (newBackground) {
            animateSwitch(newBackground)
        }
    }, [mainContext.currentLevel])

    const animateSwitch = async (newBackground: Animated.WithAnimatedObject<ImageURISource>) => {
        Animated.sequence([
            Animated.timing(backgroundRef, {
                toValue: 1,
                duration: 250,
                useNativeDriver: true
            }),
            Animated.timing(backgroundRef, {
                toValue: 0,
                duration: 250,
                useNativeDriver: true
            })
        ]).start()
        await sleep(250)
        setCurrentBackground(newBackground)
    }

    return (
        <View style={{ zIndex: -10 }}>
            <BackgroundActiveArea />
            <Animated.Image style={[styles.backImg, {
                transform: [{

                    scale: backgroundRef.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1.05, .8]
                    })
                }, {
                    translateX: mainContext.backgroundShakePosition.interpolate({
                        inputRange: [0, 0.25, 0.50, 0.75, 1],
                        outputRange: [10, 20, 10, 20, 10]
                    })
                }],
                opacity: backgroundRef.interpolate({
                    inputRange: [.2, .5, 1],
                    outputRange: [1, .5, 0]
                })
            }]} source={currentBackground} />
            <Image style={styles.underImg}
                blurRadius={4}
                source={currentBackground as ImageURISource} />
        </View>

    )
}


const styles = StyleSheet.create({
    backImg: {
        top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center',
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
        position: 'absolute',
        zIndex: -1,
        borderRadius: 15
    },
    underImg: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
        position: 'absolute',
        borderRadius: 15,
        zIndex: -2
    },
});