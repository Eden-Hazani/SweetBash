import React, { Component, useContext, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated, Dimensions, PanResponderGestureState, PanResponder, Vibration, Image } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import { returnCorrectTileAnimation } from '../Animations/TileAnimations';
import { condenseColumns, getAllMatches, markAsMatch, sleep } from '../Lib/GridApi';
import { TileData } from '../Lib/TileData';
import MainContext from '../shared/context';
import { constants } from '../Utility/constants';
import { initializeDataSource, renderTiles, recolorMatches, findSwipeDirection, validateTileUniqueness, validateMatchInProgress } from '../Utility/logic';
import { swipeDirections } from '../Utility/swipeDirections';
import { getCurrentTileFunctionality } from '../functions/uniqueTileFunctionality'
import { playLoopedSound } from '../Utility/playLoopedSound';
import { useLevelSpecificUpdate } from '../hooks/useLevelSpecificUpdate';


const SwappableGrid = () => {
    const [tileDataSource, setTileDataSource] = useState(initializeDataSource())
    const [currentMatches, setCurrentMatches] = useState<number[][]>([])

    useLevelSpecificUpdate(currentMatches)

    const gridOrigin = useRef([0, 0])
    const mainContext = useContext(MainContext)

    useEffect(() => {
        let allMatches = getAllMatches(tileDataSource)
        animateValuesToLocations(allMatches)
        setTimeout(() => {
            processMatches(allMatches, 'BEAN_SOUND', null)
        }, 700);
    }, [])


    const animateValuesToLocations = async (matches: any[]) => {
        let delayIndex: number = 150;
        tileDataSource.forEach((row, i) => {
            row.forEach((e, j) => {
                Animated.parallel([
                    Animated.sequence([
                        Animated.timing(e.location, {
                            toValue: { x: constants.TILE_WIDTH * i, y: (constants.TILE_WIDTH * j) + 5 },
                            duration: delayIndex,
                            useNativeDriver: true
                        }),
                        Animated.timing(e.location, {
                            toValue: { x: constants.TILE_WIDTH * i, y: constants.TILE_WIDTH * j },
                            duration: delayIndex,
                            useNativeDriver: true
                        }),
                    ]),
                    Animated.timing(e.scale, {
                        toValue: 1.2,
                        duration: delayIndex,
                        useNativeDriver: true
                    }),
                    Animated.timing(e.rotation, {
                        toValue: 0,
                        duration: delayIndex,
                        useNativeDriver: true
                    })
                ]).start();
                delayIndex = delayIndex + 28
            });
        });
        if (matches[0] === undefined || matches[0].length === 0) return;
        let iterations: number = matches[0].length;
        switch (true) {
            case matches[0].length > 5 && matches[0].length < 10:
                iterations = 4;
                break;
            case matches[0].length === 10:
                iterations = 6;
                break;

        }
        for (let i = 0; i < iterations; i++) {
            await playLoopedSound(matches[0], require('../assets/sounds/condensingSound.mp3'))
        }
    }

    const onLayout = (event: any) => {
        gridOrigin.current = [event.nativeEvent.layout.x, event.nativeEvent.layout.y]
    }



    const swap = (i: number, j: number, dx: number, dy: number) => {
        if (!validateMatchInProgress(tileDataSource)) return;
        const swapStarter = tileDataSource[i][j];
        if (validateTileUniqueness(swapStarter)) return;
        if (!swapStarter || swapStarter.markedAsMatch) return;
        const swapEnder = tileDataSource[i + dx][j + dy];
        if (!swapEnder || swapEnder.markedAsMatch) return;
        tileDataSource[i][j] = swapEnder;
        tileDataSource[i + dx][j + dy] = swapStarter;


        const animateSwap = Animated.parallel([
            Animated.timing(swapStarter.location, {
                toValue: { x: constants.TILE_WIDTH * (i + dx), y: constants.TILE_WIDTH * (j + dy) },
                duration: 120,
                useNativeDriver: true
            }),
            Animated.timing(swapEnder.location, {
                toValue: { x: constants.TILE_WIDTH * i, y: constants.TILE_WIDTH * j },
                duration: 120,
                useNativeDriver: true
            }),
        ])
        animateSwap.start(() => {
            let allMatches = getAllMatches(tileDataSource)
            if (allMatches.length != 0) {
                processMatches(allMatches, 'BEAN_SOUND', null)
            }
        })
    }




    const processMatches = async (matches: any[], soundName: string, uniqueAnimationName: string | null) => {
        if (!matches[0]) return
        setCurrentMatches(matches[0])
        const matchedObj = markAsMatch(matches, tileDataSource);
        const matchedArray: any[] = Object.values(matchedObj);
        for (let match of matches) {
            matchedArray.forEach((item: any, index) => returnCorrectTileAnimation(uniqueAnimationName, item, match[index], index, match[0]))
        }
        mainContext.changeScore(true, matches[0].length, soundName)
        Vibration.vibrate(400)
        await sleep(150)
        mainContext.triggerJar()
        await sleep(400)
        setTileDataSource(state => {
            let newTileDataSource = state.slice()
            condenseColumns(newTileDataSource)
            recolorMatches(newTileDataSource)
            return newTileDataSource
        })
        animateValuesToLocations(matches)
        await sleep(250)
        const nextMatches = getAllMatches(tileDataSource)
        if (nextMatches.length != 0) {
            processMatches(nextMatches, 'BEAN_SOUND', null)
        }
    }


    const uniqueTouch = (gestureState: PanResponderGestureState) => {
        let initialGestureX = gestureState.x0;
        let initialGestureY = gestureState.y0;
        let i = Math.round((initialGestureX - gridOrigin.current[0] - 0.5 * constants.TILE_WIDTH) / constants.TILE_WIDTH);
        let j = Math.round((initialGestureY - gridOrigin.current[1] - 0.5 * constants.TILE_WIDTH) / constants.TILE_WIDTH);
        const selectedTile = tileDataSource[i][j];
        if (selectedTile.markedAsMatch) return;
        if (validateTileUniqueness(selectedTile)) {
            const { matches, soundName, deductTime }: any = getCurrentTileFunctionality(selectedTile.isUnique, i, j);
            deductTime && mainContext.deductTime(deductTime)
            processMatches(matches, soundName, selectedTile.isUnique)
        }
    }




    const onSwipe = (gestureName: string, gestureState: PanResponderGestureState) => {
        const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
        let initialGestureX = gestureState.x0;
        let initialGestureY = gestureState.y0;
        let i = Math.round((initialGestureX - gridOrigin.current[0] - 0.5 * constants.TILE_WIDTH) / constants.TILE_WIDTH);
        let j = Math.round((initialGestureY - gridOrigin.current[1] - 0.5 * constants.TILE_WIDTH) / constants.TILE_WIDTH);
        switch (gestureName) {
            case SWIPE_UP:
                if (j > 0) swap(i, j, 0, -1)
                break;
            case SWIPE_DOWN:
                if (j < constants.COLUMN - 1) swap(i, j, 0, 1)
                break;
            case SWIPE_LEFT:
                if (i > 0) swap(i, j, -1, 0)
                break;
            case SWIPE_RIGHT:
                if (i < constants.ROW - 1) swap(i, j, 1, 0)
                break;
        }
    }

    const panResponder = PanResponder.create({
        // Ask to be the responder:
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onStartShouldSetPanResponderCapture: (evt, gestureState) =>
            true,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) =>
            true,

        onPanResponderGrant: (evt, gestureState) => {
            uniqueTouch(gestureState)
            // The gesture has started. Show visual feedback so the user knows
            // what is happening!
            // gestureState.d{x,y} will be set to zero now
        },
        onPanResponderMove: (evt, gestureState) => {
            // The most recent move distance is gestureState.move{X,Y}
            // The accumulated gesture distance since becoming responder is
            // gestureState.d{x,y}
        },
        onPanResponderTerminationRequest: (evt, gestureState) =>
            true,
        onPanResponderRelease: (evt, gestureState) => {
            const direction = findSwipeDirection(15, gestureState.dx, gestureState.dy);
            onSwipe(direction, gestureState)
            // The user has released all touches while this view is the
            // responder. This typically means a gesture has succeeded
        },
        onPanResponderTerminate: (evt, gestureState) => {
            // Another component has become the responder, so this gesture
            // should be cancelled
        },
        onShouldBlockNativeResponder: (evt, gestureState) => {
            // Returns whether this component should block native components from becoming the JS
            // responder. Returns true by default. Is currently only supported on android.
            return true;
        }
    })



    return (
        <View
            {...panResponder.panHandlers}
            onLayout={(e) => onLayout(e)}
            style={styles.gestureContainer}>
            {renderTiles(tileDataSource)}
        </View>
    )
}


export default SwappableGrid

const styles = StyleSheet.create({

    gestureContainer: {
        top: Dimensions.get('window').height / 10,
        width: constants.TILE_WIDTH * constants.ROW,
        height: constants.TILE_WIDTH * constants.COLUMN,
    }
});