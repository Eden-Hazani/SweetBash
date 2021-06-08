import React, { createContext, ReactNode, FC, useReducer } from "react";
import { Animated } from "react-native";
import { sleep } from "../Lib/GridApi";
import { goalCalculator } from "../Utility/scoreLogic";
import { animateCandyJar, minuetsToString, stringToMinuets } from "./contextFunctions";


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
    currentFullTime: string;
    currentTimer: string;
    deductTime: (deductibleTime: string) => void;
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
    currentFullTime: '01:00',
    deductTime: () => { },
    currentTimer: '01:00'
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
    currentFullTime: '01:00',
    deductTime: () => { },
    currentTimer: '01:00'
});


type DeductTime = {
    type: 'DEDUCT_TIME';
    payload: {
        time: string
    }
}

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

type Action = TriggerJar | ChangeScore | LevelUp | ResetGame | DeductTime





const reducer = (state: MainContextValue, action: Action) => {
    switch (action.type) {

        case 'DEDUCT_TIME': {
            let currentTimer = '';
            let time = stringToMinuets(minuetsToString(state.currentTimer) - minuetsToString(action.payload.time));
            console.log(parseInt(time.split(':')[0]), parseInt(time.split(':')[1]))
            if (parseInt(time.split(':')[0]) <= 0 && parseInt(time.split(':')[1]) <= 0) {
                currentTimer = '00:00'
            } else {
                currentTimer = `${('0' + time.split(':')[0]).slice(-2)}:${('0' + time.split(':')[1]).slice(-2)}`;
            }
            return {
                ...state,
                currentTimer
            }
        }

        case 'TRIGGER_JAR': {
            return {
                ...state,
            };
        }
        case 'RESET_GAME': {
            const currentLevel = 1
            const currentGoal = 10
            const currentScore = 0
            const currentTimer = '01:00'
            const currentFullTime = '01:00'
            return {
                ...state,
                currentLevel,
                currentGoal,
                currentScore,
                currentTimer,
                currentFullTime
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
            let currentGoal = updatedGoal;
            const currentTimer = `${('0' + currentLevel).slice(-2)}:00`
            const currentFullTime = `${('0' + currentLevel).slice(-2)}:00`
            return {
                ...state,
                currentLevel,
                currentGoal,
                currentTimer,
                currentFullTime
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

    const deductTime = (time: string) => dispatch({ type: 'DEDUCT_TIME', payload: { time } })

    return (
        <MainContext.Provider
            value={{
                ...state,
                triggerJar,
                changeScore,
                levelUp,
                resetGame,
                deductTime
            }}
        >
            {children}
        </MainContext.Provider>
    );
};

export default MainContext