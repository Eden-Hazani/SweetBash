export const generateUniqueTile = () => {
    const randomNumber = Math.random();
    if (randomNumber > .95) return 'DOUGHNUT_TILE'
    if (randomNumber > .9 && randomNumber < .95) return 'LOLLIPOP_TILE'
    if (randomNumber > .85 && randomNumber < .9) return 'SMELLY_CHEESE_TILE'
    return false
}