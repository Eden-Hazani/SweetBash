import React, { Component, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, { withRepeat, useAnimatedProps, withTiming, useDerivedValue, useSharedValue } from 'react-native-reanimated';
import Svg, { Path, Circle } from 'react-native-svg';
import { mix } from "react-native-redash";
import MaskedView from '@react-native-community/masked-view';
import { currentProgress } from '../Utility/scoreLogic';

const SIZE = Dimensions.get('window').width / 2
const AnimatedPath = Animated.createAnimatedComponent(Path)


export function WaveJar() {
    const progress = useSharedValue(0);



    useEffect(() => {
        progress.value = withRepeat(withTiming(1, { duration: 1000 }), -1, true)
    }, [])
    const data = useDerivedValue(() => {
        return {
            from: { x: mix(progress.value, -0.1, -1), y: mix(progress.value, 0, 1) },
            c1: { x: mix(progress.value, .5, 0), y: mix(progress.value, 0, .5) },
            c2: { x: mix(progress.value, .5, 1), y: mix(progress.value, 1, .5) },
            to: { x: mix(progress.value, 1.1, 2), y: mix(progress.value, 1, 0) }
        }
    });

    const path = useAnimatedProps(() => {
        const { from, c1, c2, to } = data.value;
        return {
            d: `M ${from.x} ${from.y} C ${c1.x} ${c1.y}  ${c2.x} ${c2.y} ${to.x} ${to.y} L 1 1 L 0 1 Z`
        }
    })

    return (
        <MaskedView style={styles.container} maskElement={<View style={{ backgroundColor: 'white', width: SIZE, height: SIZE, borderRadius: SIZE / 2 }}></View>}>
            <Svg width={SIZE} height={SIZE} viewBox=" 0 0 1 1">
                <AnimatedPath fill={'pink'} animatedProps={path} />
            </Svg>
        </MaskedView>
    )
}


const styles = StyleSheet.create({
    container: {
    }
});