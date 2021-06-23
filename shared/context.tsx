import React, { createContext, ReactNode, FC, useReducer } from "react";
import { Animated } from "react-native";
import { sleep } from "../Lib/GridApi";
import { goalCalculator } from "../Utility/scoreLogic";
import { animateBackgroundShake, animateCandyJar, minuetsToString, stringToMinuets } from "./contextFunctions";


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
    stopTimer: (status: boolean) => void;
    timerStatus: boolean;
    shakeBackground: () => void;
    backgroundShakePosition: Animated.Value;
}

interface MainProviderProps {
    children: ReactNode;
}

const initialMainState: MainContextValue = {
    jarLocation: new Animated.ValueXY({ x: 0, y: 0 }),
    jarRotation: new Animated.Value(0),
    backgroundShakePosition: new Animated.Value(0),
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
    currentTimer: '01:00',
    shakeBackground: () => { },
    stopTimer: () => { },
    timerStatus: false
};

const MainContext = createContext<MainContextValue>({
    ...initialMainState,
    triggerJar: () => { },
    jarRotation: new Animated.Value(0),
    backgroundShakePosition: new Animated.Value(0),
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
    currentTimer: '01:00',
    shakeBackground: () => { },
    stopTimer: () => { },
    timerStatus: false
});


type DeductTime = {
    type: 'DEDUCT_TIME';
    payload: {
        time: string
    }
}

type StopTimer = {
    type: 'STOP_TIMER';
    payload: {
        status: boolean
    }
}

type LevelUp = {
    type: 'LEVEL_UP'
}
type ResetGame = {
    type: 'RESET_GAME'
}

type ShakeBackground = {
    type: 'SHAKE_BACKGROUND'
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

type Action = TriggerJar | ChangeScore | LevelUp | ResetGame | DeductTime | ShakeBackground | StopTimer





const reducer = (state: MainContextValue, action: Action) => {
    switch (action.type) {

        case 'SHAKE_BACKGROUND': {
            return {
                ...state,
            }
        }

        case 'STOP_TIMER': {
            const timerStatus = action.payload.status
            return {
                ...state,
                timerStatus
            }
        }

        case 'DEDUCT_TIME': {
            let currentTimer = '';
            if (minuetsToString(state.currentTimer) - minuetsToString(action.payload.time) > 0) {
                let time = stringToMinuets(minuetsToString(state.currentTimer) - minuetsToString(action.payload.time));
                if (parseInt(time.split(':')[0]) <= 0 && parseInt(time.split(':')[1]) <= 0) {
                    currentTimer = '00:00'
                } else {
                    currentTimer = `${('0' + time.split(':')[0]).slice(-2)}:${('0' + time.split(':')[1]).slice(-2)}`;
                }
            } else {
                currentTimer = '00:00'
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
            const timerStatus = false
            return {
                ...state,
                currentLevel,
                currentGoal,
                currentScore,
                currentTimer,
                currentFullTime,
                timerStatus
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

    const shakeBackground = () => {
        animateBackgroundShake(state.backgroundShakePosition)
        dispatch({ type: 'SHAKE_BACKGROUND' })
    }

    const stopTimer = (status: boolean) => dispatch({ type: 'STOP_TIMER', payload: { status } })

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
                deductTime,
                shakeBackground,
                stopTimer
            }}
        >
            {children}
        </MainContext.Provider>
    );
};

export default MainContext