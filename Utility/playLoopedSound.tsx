import { Audio } from 'expo-av';
import { sleep } from "../Lib/GridApi";


export const playLoopedSound = async (numberOfMatches: number[], requestedFile: any) => {
    let delay: number = 150;
    switch (true) {
        case numberOfMatches.length > 5 && numberOfMatches.length < 10:
            delay = 120;
            break;
        case numberOfMatches.length === 10:
            delay = 70;
            break;

    }
    const { sound } = await Audio.Sound.createAsync(
        requestedFile,
        {
            shouldPlay: true,
            volume: 0.2,
        }
    );
    await sleep(delay / 2)
    await sound?.playAsync();
    await sleep(delay)
    await sound?.unloadAsync()

}

