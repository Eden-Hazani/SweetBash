export const generateUniqueTile = () => {
    const randomNumber = Math.random();
    if (randomNumber > .98) return 'DOUGHNUT_TILE'
    return false
}