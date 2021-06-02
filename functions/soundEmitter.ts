export const soundEmitter = (triggerSoundName: string) => {
    if (triggerSoundName === 'BEAN_SOUND') return require('../assets/sounds/addScore.mp3');
    if (triggerSoundName === 'DOUGHNUT_SOUND') return require('../assets/sounds/doughNutHit.mp3');

}