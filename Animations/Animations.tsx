import { Animated, Dimensions } from "react-native"
import { sleep } from "../Lib/GridApi"
import { constants } from "../Utility/constants"

export const animateVibration = async (location: Animated.ValueXY, match: number[], scale: Animated.Value) => {
    if (match[0] !== undefined) {
        Animated.parallel([
            Animated.sequence([
                Animated.timing(scale, {
                    toValue: 1.7,
                    duration: 150,
                    useNativeDriver: true
                }),
                Animated.timing(scale, {
                    toValue: .8,
                    duration: 150,
                    useNativeDriver: true
                }),
                Animated.timing(scale, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true
                }),
            ]),
            Animated.sequence([
                Animated.timing(location, {
                    toValue: { x: constants.TILE_WIDTH * match[0] + 3, y: constants.TILE_WIDTH * match[1] },
                    duration: 50,
                    useNativeDriver: true
                }),
                Animated.timing(location, {
                    toValue: { x: constants.TILE_WIDTH * match[0] - 3, y: constants.TILE_WIDTH * match[1] },
                    duration: 50,
                    useNativeDriver: true
                }),
                Animated.timing(location, {
                    toValue: { x: constants.TILE_WIDTH * match[0] + 3, y: constants.TILE_WIDTH * match[1] },
                    duration: 50,
                    useNativeDriver: true
                }),
                Animated.timing(location, {
                    toValue: { x: constants.TILE_WIDTH * match[0] - 3, y: constants.TILE_WIDTH * match[1] },
                    duration: 50,
                    useNativeDriver: true
                }),
                Animated.timing(location, {
                    toValue: { x: 10, y: -Dimensions.get('window').height / 4 },
                    duration: 300,
                    useNativeDriver: true
                }),
            ])
        ]).start()
    }
}



