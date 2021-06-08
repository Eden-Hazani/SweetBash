import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveGame = async (currentScore: number, currentLevel: number) => {
    if (currentScore === 0) return;
    const gameObj = {
        gameScore: currentScore,
        gameLevel: currentLevel,
        date: new Date().toLocaleString()
    }
    const savedScores = await AsyncStorage.getItem('savedScores');
    if (!savedScores) {
        await AsyncStorage.setItem('savedScores', JSON.stringify({ 1: gameObj }));
        return
    }
    const currentObj = JSON.parse(savedScores)
    const currentLength = Object.keys(currentObj).length;
    currentObj[currentLength + 1] = gameObj;

    await AsyncStorage.setItem('savedScores', JSON.stringify(currentObj));
}