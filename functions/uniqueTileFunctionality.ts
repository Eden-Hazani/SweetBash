
export const doughNutTileFunctionality = (tilePositionX: number, tilePositionY: number) => {
    const matches: number[][][] = [[[0, tilePositionY], [1, tilePositionY], [2, tilePositionY], [3, tilePositionY], [4, tilePositionY],
    [tilePositionX, 0], [tilePositionX, 1], [tilePositionX, 2], [tilePositionX, 3], [tilePositionX, 4]]]
    return { matches, soundName: 'DOUGHNUT_SOUND' }
}