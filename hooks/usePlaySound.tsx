import { useEffect, useState } from "react";
import { Audio } from 'expo-av';


export const usePlaySound = (requestSound: number | boolean, requestedFile: any) => {
    const [sound, setSound] = useState<null | Audio.Sound>(null);
    const getSound = async () => {
        const { sound } = await Audio.Sound.createAsync(
            requestedFile
        );
        setSound(sound);
    }
    const unloadSound = async () => sound && await sound.unloadAsync();

    const playSound = async () => sound && await sound.playAsync();

    useEffect(() => {
        if (sound) playSound()
    }, [sound])

    useEffect(() => {
        if (requestSound) getSound();
        return () => {
            unloadSound();
        }
    }, [requestSound])
}

