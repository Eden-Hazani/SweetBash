import { Animated } from "react-native";



export const animateCandyJar = (jarLocation: Animated.ValueXY, jarRotation: Animated.Value) => {
    Animated.parallel([
        Animated.sequence([
            Animated.timing(jarLocation, {
                toValue: { x: 5, y: 0 },
                duration: 150,
                useNativeDriver: false
            }),
            Animated.timing(jarLocation, {
                toValue: { x: -5, y: 0 },
                duration: 150,
                useNativeDriver: false
            }),
            Animated.timing(jarLocation, {
                toValue: { x: 5, y: 0 },
                duration: 150,
                useNativeDriver: false
            }),
            Animated.timing(jarLocation, {
                toValue: { x: -5, y: 0 },
                duration: 150,
                useNativeDriver: false
            }),
            Animated.timing(jarLocation, {
                toValue: { x: 0, y: 0 },
                duration: 150,
                useNativeDriver: false
            }),
        ]),
        Animated.sequence([
            Animated.timing(jarRotation, {
                toValue: 1,
                duration: 150,
                useNativeDriver: false
            }),
            Animated.timing(jarRotation, {
                toValue: -1,
                duration: 150,
                useNativeDriver: false
            }),
            Animated.timing(jarRotation, {
                toValue: 1,
                duration: 150,
                useNativeDriver: false
            }),
            Animated.timing(jarRotation, {
                toValue: -1,
                duration: 150,
                useNativeDriver: false
            }),
            Animated.timing(jarRotation, {
                toValue: 0,
                duration: 150,
                useNativeDriver: false
            }),
        ])
    ]).start()
}

export const minuetsToString = (time: string) => {
    let string = time.split(":");
    return Number(string[0]) * 60 + Number(string[1]);
}

export const stringToMinuets = (time: number) => {
    return Math.trunc(time / 60) + ':' + ('00' + time % 60).slice(-2);
}