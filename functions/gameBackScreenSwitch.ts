import { Animated, ImageURISource } from "react-native"

const gameBackScreenSwitch = (currentLevel: number) => {
    let background: Animated.WithAnimatedObject<ImageURISource | null> = require('../assets/backGroundLevels/level1.png');
    switch (true) {
        case currentLevel === 1:
            background = require('../assets/backGroundLevels/level1.png');
            break;
        case currentLevel === 3:
            background = require('../assets/backGroundLevels/level3.png');
            break;
        case currentLevel === 6:
            background = require('../assets/backGroundLevels/level6.png');
            break;
        default: background = null
    }
    return background
}

export default gameBackScreenSwitch