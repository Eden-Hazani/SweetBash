import React, { Component } from 'react';
import { View, TextStyle, Text, StyleSheet } from 'react-native';

interface Props {
    style: TextStyle
    children: React.ReactNode
}

export function MainText({ style, children }: Props) {
    return (
        <Text style={[styles.text, style]}>{children}</Text>
    )
}


const styles = StyleSheet.create({
    text: {
        fontFamily: 'candyFont'
    }
});