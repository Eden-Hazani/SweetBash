export const getCurrentTileFunctionality = (tileName: string, tilePositionX: number, tilePositionY: number) => {
    if (tileName === 'DOUGHNUT_TILE') return doughNutTileFunctionality(tilePositionX, tilePositionY);
    if (tileName === 'LOLLIPOP_TILE') return LollipopFunctionality(tilePositionX, tilePositionY);
    if (tileName === 'SMELLY_CHEESE_TILE') return smellyCheeseTileFunctionality(tilePositionX, tilePositionY);
    return { matches: [], soundName: 'REGULAR_SOUND' }
}

const smellyCheeseTileFunctionality = (tilePositionX: number, tilePositionY: number) => {
    const matches: number[][][] = [[[tilePositionX, tilePositionY]]]
    return { matches, soundName: 'SMELLY_CHEESE', deductTime: '00:15' }
}


const doughNutTileFunctionality = (tilePositionX: number, tilePositionY: number) => {
    const matches: number[][][] = [[[0, tilePositionY], [1, tilePositionY], [2, tilePositionY], [3, tilePositionY], [4, tilePositionY],
    [tilePositionX, 0], [tilePositionX, 1], [tilePositionX, 2], [tilePositionX, 3], [tilePositionX, 4]]]
    return { matches, soundName: 'DOUGHNUT_SOUND' }
}

const LollipopFunctionality = (tilePositionX: number, tilePositionY: number) => {
    const matches: number[][][] = [[[tilePositionX + 1, tilePositionY], [tilePositionX, tilePositionY], [tilePositionX - 1, tilePositionY],
    [tilePositionX, tilePositionY - 1], [tilePositionX, tilePositionY], [tilePositionX, tilePositionY + 1]]]
    return { matches, soundName: 'LOLLIPOP_SOUND' }
}

