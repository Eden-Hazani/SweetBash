import * as Font from 'expo-font'
import { sleep } from '../Lib/GridApi';


const startUp = async () => {
    await loadFonts();
    await sleep(500)
    return { fontsLoaded: true }
}


const loadFonts = async () => {
    Font.loadAsync({ 'candyFont': require('../assets/fonts/EmilysCandy-Regular.ttf') })
}

export default startUp