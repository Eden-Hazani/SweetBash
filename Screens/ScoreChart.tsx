import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';
import React, { Component, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, FlatList, PanResponder, ImageBackground, Animated, Dimensions } from 'react-native';
import { LoadingScreen } from '../Components/LoadingScreen';
import { ScoreListItem } from '../Components/ScoreListItem';
import { ScoreChartHeader } from '../Components/smallComponents/ScoreChartHeader';
import { randomNumberGen } from '../functions/generateRandomNumber';


interface ScoreItem {
    gameScore: number;
    gameLevel: number;
    date: Date;
}
interface ScoreData {
    [key: number]: ScoreItem;
}


export function ScoreChart() {
    const [scoreBoard, setScoreBoard] = useState<ScoreData | null | boolean>(null)
    const [requiredImgs, setRequiredImgs] = useState<any[]>([])
    const navigate = useNavigation()
    const scrollY = useRef(new Animated.Value(0)).current
    let currentThreshold: number = 20;

    useEffect(() => {
        getScoreInfo()
    }, [])

    const getRandomImgRequire = () => {
        const randomNumber = randomNumberGen(3)
        if (randomNumber === 1) return require(`../assets/scoreCloud1.png`);
        else if (randomNumber === 2) return require(`../assets/scoreCloud2.png`);
        else if (randomNumber === 3) return require(`../assets/scoreCloud3.png`);
    }

    const getScoreInfo = async () => {
        let requiredImg: any[] = []
        const scores = await AsyncStorage.getItem('savedScores');
        if (!scores) {
            setScoreBoard(false);
            return
        }
        const objScores = JSON.parse(scores);
        const rearrangedList: any = Object.values(objScores).sort((a: any, b: any) => (a.gameScore < b.gameScore) ? 1 : -1)
        rearrangedList.forEach(() => requiredImg.push(getRandomImgRequire()))
        setRequiredImgs(requiredImg)
        rearrangedList[0] = { title: 'Score Board' }
        setScoreBoard(rearrangedList)
    }

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => false,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
        onMoveShouldSetPanResponder: (evt, gestureState) => {
            if (gestureState?.moveX > gestureState?.moveY) {
                return false;
            }
            return true
        },
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
        onPanResponderGrant: (evt, gestureState) => { },
        onPanResponderMove: (evt, gestureState) => {
            if ((gestureState.dx - currentThreshold) > 30) {
                navigate.canGoBack() && navigate.goBack()
            }
        },
        onPanResponderTerminationRequest: (evt, gestureState) => true,
        onPanResponderRelease: (evt, gestureState) => { },
    })




    return (
        <View
            style={{ flex: 1 }}
            {...panResponder.panHandlers}>
            <ImageBackground style={styles.container}
                source={require('../assets/scoreboardWallpaper.png')}
                {...panResponder.panHandlers}
            >
                {scoreBoard === null && <LoadingScreen scale={1} />}
                {scoreBoard !== null && scoreBoard !== false ?
                    <Animated.FlatList
                        keyExtractor={(_, index) => index.toString()}
                        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }],
                            { useNativeDriver: true })}
                        data={Object.values(scoreBoard)}
                        renderItem={({ item, index }: any) => {

                            if (index === 0) {
                                return <ScoreChartHeader title={item.title} />
                            }
                            return <ScoreListItem requiredImg={requiredImgs[index - 1]} scrollY={scrollY} index={index} item={item} />
                        }}
                    />
                    :
                    <ScoreChartHeader title={'No scores recorded'} />
                }
            </ImageBackground>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
    }
});