import React, { Component, useContext, useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Image, ImageStyle, View } from 'react-native';
import { sleep } from '../../Lib/GridApi';
import MainContext from '../../shared/context';

const visibleAreaSwitch = (currentLevel: number) => {
    let styles: ImageStyle | null | string = null
    switch (true) {
        case currentLevel === 3:
            styles = {
                position: 'absolute',
                width: Dimensions.get('window').width,
                opacity: .7,
                height: 150,
                top: Dimensions.get('window').height / 2.8,
                borderWidth: 5,
                backgroundColor: '#6a040f',
                borderColor: 'orange',
                borderRadius: 15
            }
            break;
        case currentLevel === 4 || currentLevel === 5:
            styles = "MAINTAIN"
            break;
        case currentLevel === 6:
            styles = {
                position: 'absolute',
                width: Dimensions.get('window').width,
                opacity: .8,
                height: 150,
                top: Dimensions.get('window').height / 2.2,
                borderWidth: 5,
                backgroundColor: 'white',
                borderColor: '#72BBE4',
                borderRadius: 15
            }
            break;
        default: styles = null
    }
    return styles
}




export function BackgroundActiveArea() {
    const mainContext = useContext(MainContext)
    const [currentStyle, setCurrentStyle] = useState<ImageStyle | null>(null)
    const backgroundRef = useRef(new Animated.Value(0)).current;

    const animateEntrance = async (newStyle: ImageStyle) => {
        backgroundRef.setValue(0)
        Animated.timing(backgroundRef, {
            toValue: 1,
            duration: 700,
            useNativeDriver: true
        }).start()
        await sleep(250)
        setCurrentStyle(newStyle)
    }
    const animateExit = async (newStyle: null) => {
        Animated.timing(backgroundRef, {
            toValue: 0,
            duration: 700,
            useNativeDriver: true
        }).start()
        await sleep(250)
        setCurrentStyle(newStyle)
    }

    const setRanges = () => {
        if (currentStyle) {
            return {
                inputRange: [0, .5, 1],
                outputRange: [0, Dimensions.get('window').width + 50, 0]
            }
        } else {
            return {
                inputRange: [0, 1],
                outputRange: [Dimensions.get('window').width + 50, 0]
            }
        }
    }

    useEffect(() => {
        const newStyle = visibleAreaSwitch(mainContext.currentLevel);
        if (typeof (newStyle) === 'string') {
            return
        }
        if (newStyle) {
            animateEntrance(newStyle)
        } else {
            animateExit(newStyle)
        }
    }, [mainContext.currentLevel])


    return (
        currentStyle === null ? null : <Animated.View
            style={[currentStyle, {
                transform: [{
                    translateX: backgroundRef.interpolate(setRanges())
                }]
            }]} />
    )
}


