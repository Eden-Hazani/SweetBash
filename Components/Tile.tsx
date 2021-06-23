import React, { Component } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { randomNumberGen } from '../functions/generateRandomNumber';
import { TileData } from '../Lib/TileData';
import { constants } from '../Utility/constants';

interface Props {
    location: Animated.ValueXY;
    scale: Animated.Value;
    rotate: Animated.Value
    imageObj: any;
}

export function Tile({ imageObj, location, scale, rotate }: Props) {
    return (
        <Animated.Image
            source={imageObj.image}
            style={[
                styles.tile,
                {
                    transform: [
                        { translateX: location.x, }, { translateY: location.y }, { scale: scale },
                        {
                            rotate: rotate.interpolate({
                                inputRange: [0, 1],
                                outputRange: ['0deg', '360deg']
                            })
                        }
                    ]
                }
            ]} />
    )
}


const styles = StyleSheet.create({
    tile: {
        width: constants.TILE_WIDTH,
        height: constants.TILE_WIDTH,
        position: 'absolute',
        zIndex: 1,
    }
});