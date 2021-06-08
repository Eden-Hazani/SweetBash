import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, ImageBackground, Animated } from 'react-native';
import { MainText } from '../Core/MainText';

const { height, width } = Dimensions.get('screen')

interface ScoreItem {
    gameScore: number;
    gameLevel: number;
    date: Date;
}

interface Props {
    item: ScoreItem;
    index: number;
    scrollY: Animated.Value;
    requiredImg: any;
}

export function ScoreListItem({ item, index, scrollY, requiredImg }: Props) {
    const position = Animated.subtract(index * 180, scrollY);
    const isDisappearing = -165;
    const isTop = 0;
    const isBottom = height - 165;
    const isAppearing = height;
    const inputRange = [isDisappearing, isTop, isBottom, isAppearing];



    const scale = position.interpolate({
        inputRange,
        outputRange: [.5, 1, 1, .9],
    })
    const opacity = position.interpolate({
        inputRange: [isDisappearing, isTop, isBottom, isAppearing],
        outputRange: [.5, 1, 1, .9],
    });

    return (
        <Animated.View style={{ opacity, transform: [{ scale }] }}>
            <ImageBackground source={requiredImg} style={[styles.container, {
                [index % 2 === 0 ? 'marginRight' : 'marginLeft']: Dimensions.get('window').width / 3
            }]}>
                <View style={{ flexDirection: 'row', paddingTop: 25 }}>
                    <MainText style={{ fontSize: 15, marginRight: 15 }}>Level: {item.gameLevel}</MainText>
                    <MainText style={{ fontSize: 15 }}>Score: {item.gameScore}</MainText>
                </View>
                <MainText style={{ fontSize: 15 }}>{item.date}</MainText>
            </ImageBackground>
        </Animated.View>
    )
}


const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width / 1.5,
        height: 150,
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center',
    }
});