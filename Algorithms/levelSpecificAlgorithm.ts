const returnLevelAlgorithm = (currentLevel: number, matches: number[][]) => {
    let returnedValue = null;
    switch (true) {
        case currentLevel >= 3 && currentLevel < 6:
            returnedValue = { timeReduction: levelThreeAlgorithm(matches) }
            break;
        case currentLevel >= 6 && currentLevel < 9:
            returnedValue = { timeReduction: levelSixAlgorithm(matches) }
            break;
    }
    return returnedValue
}

const levelThreeAlgorithm = (matches: number[][]) => {
    let timeReduction: number = 0;
    for (let item of matches) {
        if (item[1] < 2) timeReduction = timeReduction + 10
    }
    return timeReduction
}
const levelSixAlgorithm = (matches: number[][]) => {
    let timeReduction: number = 0;
    for (let item of matches) {
        if (item[1] > 0 && item[1] < 3) timeReduction = timeReduction + 15
    }
    return timeReduction
}

export default returnLevelAlgorithm