import React, { createContext, ReactNode, FC, useReducer } from "react";
import { Animated } from "react-native";
import { sleep } from "../Lib/GridApi";
import { goalCalculator } from "../Utility/scoreLogic";
import { animateCandyJar } from "./contextFunctions";


interface MainContextValue {
    triggerJar: () => void;
    jarLocation: Animated.ValueXY;
    jarRotation: Animated.Value;
    currentScore: number;
    changeScore: Function;
    currentGoal: number;
    currentLevel: number;
    levelUp: Function;
    currentSound: string;
    resetGame: Function;
    resetClock: boolean;
}

interface MainProviderProps {
    children: ReactNode;
}

const initialMainState: MainContextValue = {
    jarLocation: new Animated.ValueXY({ x: 0, y: 0 }),
    jarRotation: new Animated.Value(0),
    triggerJar: () => { },
    currentScore: 0,
    changeScore: (val: boolean, score: number) => { },
    currentGoal: 10,
    currentLevel: 1,
    levelUp: () => { },
    currentSound: '',
    resetGame: () => { },
    resetClock: false
};

const MainContext = createContext<MainContextValue>({
    ...initialMainState,
    triggerJar: () => { },
    jarRotation: new Animated.Value(0),
    jarLocation: new Animated.ValueXY({ x: 0, y: 0 }),
    currentScore: 0,
    changeScore: (val: boolean, score: number) => { },
    currentGoal: 10,
    currentLevel: 1,
    levelUp: () => { },
    currentSound: '',
    resetGame: () => { },
    resetClock: false
});


type LevelUp = {
    type: 'LEVEL_UP'
}
type ResetGame = {
    type: 'RESET_GAME'
}

type TriggerJar = {
    type: 'TRIGGER_JAR';
};

type ChangeScore = {
    type: 'CHANGE_SCORE';
    payload: {
        score: number
        currentSound: string
    }
};

type Action = TriggerJar | ChangeScore | LevelUp | ResetGame





const reducer = (state: MainContextValue, action: Action) => {
    switch (action.type) {

        case 'TRIGGER_JAR': {
            return {
                ...state,
            };
        }
        case 'RESET_GAME': {
            const currentLevel = 1
            const currentGoal = 10
            const currentScore = 0
            const resetClock = !state.resetClock
            return {
                ...state,
                currentLevel,
                currentGoal,
                currentScore,
                resetClock
            };
        }

        case 'CHANGE_SCORE': {
            const currentScore = { ...state }.currentScore + action.payload.score
            const currentSound = action.payload.currentSound
            return {
                ...state,
                currentScore,
                currentSound
            };
        }

        case 'LEVEL_UP': {
            const { updatedGoal, updatedLevel } = goalCalculator(state.currentLevel, state.currentGoal);
            let currentLevel = updatedLevel;
            let currentGoal = updatedGoal
            return {
                ...state,
                currentLevel,
                currentGoal
            }
        }

        default: {
            return { ...state };
        }
    }
};



export const MainProvider: FC<MainProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialMainState);

    const triggerJar = async () => {
        animateCandyJar(state.jarLocation, state.jarRotation)
        dispatch({ type: 'TRIGGER_JAR' })
    }

    const changeScore = (adding: boolean, scoreAmount: number, currentSound: string) => {
        if (adding) {
            dispatch({ type: 'CHANGE_SCORE', payload: { score: scoreAmount, currentSound } });
            return
        }
        dispatch({ type: 'CHANGE_SCORE', payload: { score: -scoreAmount, currentSound } });
        return
    }

    const levelUp = () => dispatch({ type: 'LEVEL_UP' });

    const resetGame = () => dispatch({ type: 'RESET_GAME' })


    return (
        <MainContext.Provider
            value={{
                ...state,
                triggerJar,
                changeScore,
                levelUp,
                resetGame
            }}
        >
            {children}
        </MainContext.Provider>
    );
};

export default MainContext