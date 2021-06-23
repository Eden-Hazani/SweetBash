import { useContext, useEffect } from "react"
import returnLevelAlgorithm from "../Algorithms/levelSpecificAlgorithm";
import MainContext from "../shared/context"

export const useLevelSpecificUpdate = (matches: number[][]) => {
    const mainContext = useContext(MainContext);

    useEffect(() => {
        const levelAction = returnLevelAlgorithm(mainContext.currentLevel, matches)
        if (levelAction?.timeReduction) {
            const minutes = Math.floor(levelAction.timeReduction / 60);
            const seconds = levelAction.timeReduction % 60;
            mainContext.deductTime(`${minutes}:${seconds}`);
            mainContext.shakeBackground()
        }
    }, [matches])
}