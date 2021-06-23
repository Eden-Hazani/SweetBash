import { Animated, Dimensions } from "react-native"
import { sleep } from "../Lib/GridApi"
import { TileData } from "../Lib/TileData";
import { constants } from "../Utility/constants"
import doughnutAlgorithm from "./functions/doughnutAlgorithm";
import lollipopAlgorithm from "./functions/lollipopAlgorithm";


export const returnCorrectTileAnimation = (animationName: string | null, tileData: TileData, match: number[], matchIndex: number, firstItemLocation: number[]) => {
    if (animationName === null) return animateVibration(tileData.location, match, tileData.scale);
    else if (animationName === "SMELLY_CHEESE_TILE") return animateSmellyCheese(tileData.location, match, tileData.scale)
    else if (animationName === "LOLLIPOP_TILE") return animateLollipop(tileData.location, match, tileData.scale, tileData.rotation, matchIndex)
    else if (animationName === "DOUGHNUT_TILE") return animateDoughnut(tileData.location, match, tileData.scale, tileData.rotation, matchIndex, firstItemLocation)
}


const animateDoughnut = (location: Animated.ValueXY, match: number[], scale: Animated.Value, rotation: Animated.Value, matchIndex: number, firstItemLocation: number[]) => {
    if (match[0] !== undefined) {
        Animated.parallel([
            Animated.timing(rotation, {
                toValue: 1,
                duration: 250,
                useNativeDriver: true
            }),
            animateScaleTurbulence(scale, 500),
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
                    toValue: { x: constants.TILE_WIDTH * match[0], y: constants.TILE_WIDTH * match[1] },
                    duration: 50,
                    useNativeDriver: true
                }),
                doughnutAlgorithm(matchIndex, location, match, firstItemLocation)
            ])
        ]).start()
    }
}

const animateLollipop = (location: Animated.ValueXY, match: number[], scale: Animated.Value, rotation: Animated.Value, matchIndex: number) => {
    if (match[0] !== undefined) {
        Animated.parallel([
            Animated.timing(rotation, {
                toValue: -1,
                duration: 250,
                useNativeDriver: true
            }),
            animateScaleTurbulence(scale, 300),
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
                    toValue: { x: constants.TILE_WIDTH * match[0], y: constants.TILE_WIDTH * match[1] },
                    duration: 50,
                    useNativeDriver: true
                }),
                lollipopAlgorithm(matchIndex, location, match)
            ])
        ]).start()
    }
}


const animateSmellyCheese = (location: Animated.ValueXY, match: number[], scale: Animated.Value) => {
    if (match[0] !== undefined) {
        Animated.parallel([
            animateScaleTurbulence(scale, 300),
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
                    toValue: { x: constants.TILE_WIDTH * match[0], y: Dimensions.get('window').height / 2 },
                    duration: 300,
                    useNativeDriver: true
                }),
            ])
        ]).start()
    }
}

const animateVibration = async (location: Animated.ValueXY, match: number[], scale: Animated.Value) => {
    if (match[0] !== undefined) {
        Animated.parallel([
            animateScaleTurbulence(scale, 300),
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


const animateScaleTurbulence = (scale: Animated.Value, animationTimer: number) => {
    return Animated.sequence([
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
            duration: animationTimer,
            useNativeDriver: true
        }),
    ])
}
