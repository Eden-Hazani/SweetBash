import React, { Component } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { View, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { MainText } from '../Core/MainText';
import MainContext from '../shared/context';
import { PunishTimeZones } from './PunishTimeZones';
import tutorialLevelSwitch from './tutorialLevelSwitch';

export function TutorialModel() {
    const [isTutorial, setIsTutorial] = useState<string>('');
    const mainContext = useContext(MainContext);

    useEffect(() => {
        startTutorial()
    }, [mainContext.currentLevel])

    const startTutorial = async () => {
        const result = await tutorialLevelSwitch(mainContext.currentLevel)
        if (result !== '') mainContext.stopTimer(true)
        setIsTutorial(result)
    }
    const closeTutorial = () => {
        setIsTutorial('')
        mainContext.stopTimer(false)
    }

    return (
        <Modal style={styles.container} visible={isTutorial !== ''} animationType="slide">
            <View style={{ flex: 1 }}>
                <View style={{ flex: .8 }}>
                    {isTutorial === 'LEVEL_3' && <PunishTimeZones />}
                </View>
                <View style={{ flex: .2 }}>
                    <TouchableOpacity onPress={() => closeTutorial()} style={styles.button}>
                        <MainText style={{ fontSize: 20, textAlign: 'center', color: '#cbffc0' }}>Got it!</MainText>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}


const styles = StyleSheet.create({
    container: {

    },
    button: {
        backgroundColor: 'pink',
        width: '40%',
        marginRight: 'auto',
        marginLeft: 'auto',
        padding: 15,
        borderRadius: 10,
        marginTop: 15
    }
});