import { Animated, Dimensions } from "react-native";
import { constants } from "../../Utility/constants";

const doughnutAlgorithm = (index: number, location: Animated.ValueXY, match: number[], firstItemLocation: number[]) => {

    let moveTo: { x: number, y: number } = { x: 0, y: 0 };
    const width = firstItemLocation[1] > 2 ? Dimensions.get('window').width : -Dimensions.get('window').width;
    const height = firstItemLocation[1] < 2 ? Dimensions.get('window').height / 1.2 : -Dimensions.get('window').height / 1.2;
    if (firstItemLocation[1] === match[1]) {
        moveTo = { x: width, y: constants.TILE_WIDTH * match[1] };
    }
    else {
        moveTo = { x: constants.TILE_WIDTH * match[0], y: height };
    }

    return Animated.timing(location, {
        toValue: moveTo,
        duration: 450,
        useNativeDriver: true
    })
}

export default doughnutAlgorithm