import { Animated } from "react-native"
import { constants } from "../Utility/constants"
import { validateImgObjectUniqueness } from "../Utility/logic"
import { TileData } from "./TileData"

interface ImgObj {
    image: any;
    color: number;
    isUnique: boolean;
}

export const isMatch = (objOne: ImgObj, objTwo: ImgObj) => {
    if (!validateImgObjectUniqueness(objOne)) return;
    if (objOne != null && objTwo != null) {
        if (objOne.image == objTwo.image) {
            return true
        } else {
            return false
        }
    }
}

// Iterates through each row to look for a match.
const checkRowsForMatch = (tileData: TileData[][]) => {
    // Store the array of matches
    let matches = []
    // Iterate through the rows from top to bottom.
    for (let j = 0; j < 5; j++) {
        // Record the first index in the row.
        let firstIndex = [0, j]
        // Add the index to our potentialMatch
        let potentialMatch = [firstIndex]
        // Record the imgage object corresponding to the first element in our potentialMatch
        let currentImageObj = tileData[0][j].imageObj
        // Traverse the elements of the row.
        for (let i = 0; i < 5; i++) {
            // Get the object stored in the next tile. Set to null if the next index is out of range.
            let nextTileObj = (i + 1) < 5 ? tileData[i + 1][j].imageObj : null
            if (tileData[i][j + 1] && tileData[i][j + 1].markedAsMatch) return []
            if (isMatch(currentImageObj, nextTileObj)) {
                // Add the next index to our potential Match.
                potentialMatch.push([i + 1, j])
            } else {
                // Check to see if the potentialMatch is greater than 3.
                if (potentialMatch.length >= 3) {
                    matches.push(potentialMatch)
                }
                // Reset the first index.
                firstIndex = [i + 1, j]
                // Add it to the potentialMatch
                potentialMatch = [firstIndex]
                // Reset the current imageObj to that of the next image.
                currentImageObj = (i + 1) < 5 ? tileData[i + 1][j].imageObj : null
            }
        }
    }
    return matches
}

// Iterates through each row to look for a match.
const checkColsForMatch = (tileData: TileData[][]) => {
    let matches = []

    for (var i = 0; i < 5; i++) {
        let firstIndex = [i, 0]
        let potentialMatch = [firstIndex]
        let currentImageObj = tileData[i][0].imageObj

        for (var j = 0; j < 5; j++) {
            let nextTileObj = (j + 1) < 5 ? tileData[i][j + 1].imageObj : null
            if (tileData[i][j + 1] && tileData[i][j + 1].markedAsMatch) return []
            if (isMatch(currentImageObj, nextTileObj)) {
                potentialMatch.push([i, j + 1])

            } else {

                if (potentialMatch.length >= 3) {
                    matches.push(potentialMatch)
                }
                firstIndex = [i, j + 1]
                potentialMatch = [firstIndex]
                currentImageObj = (j + 1) < 5 ? tileData[i][j + 1].imageObj : null
            }
        }
    }
    return matches
}


export const getAllMatches = (tileData: TileData[][]) => {

    let rowMatches = checkRowsForMatch(tileData)
    let colMatches = checkColsForMatch(tileData)
    return [...rowMatches, ...colMatches]
}

const checkForTileExistence = (tilePositionX: number, tilePositionY: number) => {
    if (tilePositionX >= 5 || tilePositionY >= 5) {
        return false
    } else if (tilePositionY < 0 || tilePositionX < 0) {
        return false
    }
    return true
}

export const markAsMatch = (matches: any[], tileData: TileData[][]) => {
    const matchedObj: any = {};
    matches.forEach((match) => {
        match.forEach((e: any, index: number) => {

            if (checkForTileExistence(e[0], e[1])) {
                let i = e[0]
                let j = e[1]
                tileData[i][j].markedAsMatch = true
                matchedObj[`${index}`] = tileData[i][j]
            }
        })
    })
    return matchedObj
}



export const condenseColumns = (tileData: TileData[][]) => {
    let numOfRows = tileData[0].length
    let numOfCols = tileData.length
    let spotsToFill = 0;

    for (let i = 0; i < numOfRows; i++) {
        spotsToFill = 0;
        for (let j = numOfCols - 1; j >= 0; j--) {

            if (tileData[i][j].markedAsMatch == true) {
                spotsToFill++;
                tileData[i][j].location.setValue({
                    x: constants.TILE_WIDTH * i,
                    y: -4 * constants.TILE_WIDTH
                });
            }

            else if (spotsToFill > 0) {
                const currentSpot = tileData[i][j];
                const newSpot = tileData[i][j + spotsToFill];
                tileData[i][j] = newSpot;
                tileData[i][j + spotsToFill] = currentSpot;
            }
        }
    }
}

export const sleep = (ms: number) => {
    return new Promise(r => setTimeout(r, ms))
}