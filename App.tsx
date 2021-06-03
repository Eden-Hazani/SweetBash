import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { LoadingScreen } from './Components/LoadingScreen';
import { AppNavigation } from './Navigation/AppNavigation';
import { GameScreen } from './Screens/GameScreen';
import { MainProvider } from './shared/context'
import startUp from './Utility/startupFunctions';

export default function App() {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fireStart()
  })
  const fireStart = async () => {
    await startUp()
    setLoading(false)
  }
  return (
    <SafeAreaView style={styles.container}>
      {loading ? <LoadingScreen scale={1} /> :
        <MainProvider >
          <AppNavigation />
        </MainProvider>
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
