import { Animated, Dimensions } from "react-native"
import { constants } from "../../Utility/constants"


const lollipopAlgorithm = (index: number, location: Animated.ValueXY, match: number[]) => {
    let moveTo: { x: number, y: number } = { x: 0, y: 0 };
    switch (true) {
        case index === 0:
            moveTo = { x: constants.TILE_WIDTH * match[0] + 150, y: constants.TILE_WIDTH * match[1] };
            break;
        case index === 2:
            moveTo = { x: constants.TILE_WIDTH * match[0] - 150, y: constants.TILE_WIDTH * match[1] };
            break;
        case index === 3:
            moveTo = { x: constants.TILE_WIDTH * match[0], y: constants.TILE_WIDTH * match[0] - 250 };
            break;
        case index === 5:
            moveTo = { x: constants.TILE_WIDTH * match[0], y: constants.TILE_WIDTH * match[0] + 250 };
            break;
        default: moveTo = { x: constants.TILE_WIDTH * match[0], y: constants.TILE_WIDTH * match[1] }
    }
    return Animated.timing(location, {
        toValue: moveTo,
        duration: 300,
        useNativeDriver: true
    })
}


export default lollipopAlgorithm