import { useContext, useEffect, useState } from "react";
import MainContext from "../shared/context";


export const useTimer = (min: number, potentialRefresh: any) => {
    const [currentTimer, setCurrentTimer] = useState<NodeJS.Timeout | null>(null)
    const [currentTime, setCurrentTime] = useState<string>('')
    useEffect(() => {
        let sec: number = 0;
        currentTimer && clearInterval(currentTimer)
        setCurrentTimer(startTimer(sec))
    }, [min, potentialRefresh])

    const startTimer = (sec: number) => {
        const currentTimer = setInterval(() => {
            sec--;
            if (sec < 0) sec = 0
            setCurrentTime(`${('0' + min).slice(-2)}:${('0' + sec).slice(-2)}`)
            if (min <= 0 && sec <= 0) {
                setCurrentTime(`00:00`)
                currentTimer && clearInterval(currentTimer)
            }
            if (sec === 0) {
                min--;
                sec = 60;
            }
        }, 1000);
        return currentTimer
    }

    return currentTime
}