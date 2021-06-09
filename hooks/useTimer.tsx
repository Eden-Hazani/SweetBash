import { useContext, useEffect, useState } from "react";
import MainContext from "../shared/context";
import useDidUpdate from "./useDidUpdate";


export const useTimer = (currentFullTime: string, pause: boolean, isMounted: boolean) => {
    const mainContext = useContext(MainContext)
    const [currentTimer, setCurrentTimer] = useState<NodeJS.Timeout | null>(null)

    useEffect(() => {
        if (pause) {
            currentTimer && clearInterval(currentTimer)
            return
        }
        if (isMounted) {
            currentTimer && clearInterval(currentTimer)
            setCurrentTimer(startTimer())
        } else {
            currentTimer && clearInterval(currentTimer)
        }
    }, [mainContext.currentTimer, currentFullTime, pause])


    const startTimer = () => {
        const currentTimer = setInterval(() => {
            let min = parseInt(mainContext.currentTimer.split(':')[0], 10)
            let sec = parseInt(mainContext.currentTimer.split(':')[1], 10)
            sec--;
            if (sec < 0) sec = 0
            if (min <= 0 && sec <= 0) {
                mainContext.deductTime('00:01')
                currentTimer && clearInterval(currentTimer)
                return;
            }
            if (sec === 0) {
                min--;
                sec = 60;
            }
            mainContext.deductTime('00:01')
        }, 1000);
        return currentTimer
    }

}