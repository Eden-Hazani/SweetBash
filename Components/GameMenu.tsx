import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'

interface Props {
    allowGoBack: Function
}

export function GameMenu({ allowGoBack }: Props) {
    return (
        <TouchableOpacity style={styles.container} onPress={() => allowGoBack()}>
            <MaterialCommunityIcons name={'close'} color={'black'} size={45} />
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: '3%'
    }
});