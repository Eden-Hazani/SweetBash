export const generateUniqueTile = () => {
    const randomNumber = Math.random();
    if (randomNumber > .97) return 'DOUGHNUT_TILE'
    if (randomNumber > .9 && randomNumber < .97) return 'LOLLIPOP_TILE'
    if (randomNumber > .85 && randomNumber < .9) return 'SMELLY_CHEESE_TILE'
    return false
}