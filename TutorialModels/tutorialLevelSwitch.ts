import AsyncStorage from "@react-native-async-storage/async-storage";

interface Tutorials {
    level3?: boolean
}


const tutorialLevelSwitch = async (currentLevel: number) => {
    let isTutorial: string = '';
    let objPassedTut: Tutorials = {};
    const passedTutorials = await AsyncStorage.getItem('passedTutorials');
    if (passedTutorials) {
        objPassedTut = JSON.parse(passedTutorials)
    }
    switch (true) {
        case currentLevel === 3 && !objPassedTut.level3:
            isTutorial = "LEVEL_3";
            break;
        default: isTutorial = '';
    }

    return isTutorial
}

export default tutorialLevelSwitch