import React, { Component } from 'react';
import { Image } from 'react-native';
import { View, StyleSheet } from 'react-native';
import { MainText } from '../Core/MainText';
import MaskedView from '@react-native-community/masked-view';

export function PunishTimeZones() {
    return (
        <View style={styles.container}>
            <MainText style={{ fontSize: 35, marginBottom: 20, marginTop: 10 }}>Restricted Areas</MainText>
            <MaskedView style={styles.container} maskElement={<View style={{ backgroundColor: 'white', width: 250, height: 250, borderRadius: 15 }}></View>}>
                <Image source={require('../assets/tutorials/level3.gif')} style={{ width: 250, height: 250 }} />
            </MaskedView>
            <View style={styles.textContainer}>
                <MainText style={{ textAlign: 'center', color: '#cbffc0', fontSize: 18 }}>Some stages have restricted areas.</MainText>
                <MainText style={{ textAlign: 'center', fontSize: 18, color: '#cbffc0' }}>Any candy popped inside the restricted area will decrease your game time.</MainText>
                <MainText style={{ textAlign: 'center', fontSize: 18, color: '#cbffc0', paddingTop: 20 }}>Try to move the candies outside the area without lining them in rows of 3 or more.</MainText>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    textContainer: {
        marginTop: 25,
        borderRadius: 15,
        padding: 15,
        backgroundColor: 'pink',
        marginLeft: 10,
        marginRight: 10,
        borderColor: '#e67f90',
        borderWidth: 1
    }
});