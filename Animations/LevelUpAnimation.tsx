import React, { useEffect, useRef, LegacyRef, useState, useContext } from 'react';
import { Dimensions, StyleSheet, View, Animated } from 'react-native';
import LottieView from 'lottie-react-native';
import MainContext from '../shared/context';
const { height, width } = Dimensions.get('screen')


export function LevelUpAnimation() {
    const [visible, setVisible] = useState(false)
    const [currentWidth, setCurrentWidth] = useState(new Animated.Value(0));
    const animationRef = useRef<null | LottieView>(null)

    const mainContext = useContext(MainContext)

    useEffect(() => {
        animationRef.current && animationRef.current.play();
    })

    useEffect(() => {
        if (mainContext.currentLevel > 1) {
            setVisible(true)
            animateScale()
            setTimeout(() => {
                setVisible(false)
            }, 1750);
        }
    }, [mainContext.currentLevel])

    const animateScale = () => {
        Animated.sequence([
            Animated.timing(currentWidth, {
                toValue: 1,
                delay: 1000,
                duration: 700,
                useNativeDriver: true
            }),
            Animated.timing(currentWidth, {
                toValue: 0,
                duration: 250,
                useNativeDriver: true
            }),
        ]).start()
    }

    return (
        visible ?
            <Animated.View style={[styles.container,
            {
                transform: [{
                    scale: currentWidth.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 0]
                    })
                }]
            }
            ]}>
                <LottieView
                    ref={animationRef}
                    style={styles.container}
                    source={require('../assets/animations/levelUp.json')}
                />
            </Animated.View>
            : null
    )
}


const styles = StyleSheet.create({
    lottie: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: width / 1.2,
        height: width / 1.2,
        zIndex: 20,
        elevation: 20
    },
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 20,
        elevation: 20
    }
});