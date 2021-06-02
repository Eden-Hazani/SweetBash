import { Dimensions } from "react-native"

let Window = Dimensions.get('window')
let windowSpan = Math.min(Window.width, Window.height)
let TILE_WIDTH = windowSpan / 5

const constants = {
    keys: [
        [0, 1, 2, 3, 4],
        [5, 6, 7, 8, 9],
        [10, 11, 12, 13, 14],
        [15, 16, 17, 18, 19],
        [20, 21, 22, 23, 24]
    ],
    ROW: 5,
    COLUMN: 5,
    TILE_WIDTH
}



export { constants }