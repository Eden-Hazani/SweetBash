import React from 'react'
import { constants } from "./constants";
import { TileData } from '../Lib/TileData'
import { BEANS, BEAN_OBJS, uniqueTiles } from "../Lib/Images";
import { Tile } from '../Components/Tile'
import { Dimensions } from 'react-native';
import { generateUniqueTile } from '../functions/tileUniquenessGen';

interface ImgObj {
  image: any;
  color: number;
  isUnique: boolean;
}


const getRadomInt = () => Math.floor((Math.random() * 7))

const initializeDataSource = () => {
  let tileData = constants.keys.map((row, i) => {
    let dataRows = row.map((key, j) => {
      let int = getRadomInt()
      const isUnique = generateUniqueTile();
      if (isUnique) {
        return new TileData(uniqueTiles[isUnique], key, isUnique);
      }
      return new TileData(BEAN_OBJS[int], key, 'REGULAR_TILE');
    });
    return dataRows;
  });
  return tileData;
}


const renderTiles = (tileDataSource: TileData[][]) => {
  let tiles: any[] = [];
  tileDataSource.forEach((row, i) => {
    let rows = row.forEach((e, j) => {
      // e is a singular TileData class.
      tiles.push(
        <Tile
          rotate={e.rotation}
          key={e.key}
          location={e.location}
          scale={e.scale}
          imageObj={e.imageObj}
        />
      );
    });
  });
  return tiles
}


const recolorMatches = (tileData: TileData[][]) => {
  tileData.forEach(row => {
    row.forEach(e => {
      if (e.markedAsMatch == true) {
        const isUnique = generateUniqueTile();
        if (isUnique) {
          let randomBeanObj = uniqueTiles[isUnique]
          e.markedAsMatch = false
          e.isUnique = isUnique
          e.imageObj = randomBeanObj
          return
        }
        let randIndex = getRadomInt();
        let randomBeanObj = BEAN_OBJS[randIndex]
        e.isUnique = 'REGULAR_TILE'
        e.markedAsMatch = false
        e.imageObj = randomBeanObj
      }
    })
  });
}



const findSwipeDirection = (thrashHold: number, gestureDx: number, gestureDy: number) => {
  if (gestureDx > thrashHold || gestureDx < -thrashHold) {
    if (gestureDx <= -thrashHold) return "SWIPE_LEFT";
    else if (gestureDx >= thrashHold) return "SWIPE_RIGHT";
  }
  else {
    if (gestureDy >= thrashHold) return "SWIPE_DOWN";
    else if (gestureDy <= -thrashHold) return "SWIPE_UP"
  }
  return ""
}

const validateTileUniqueness = (tile: TileData) => {
  if (tile && tile.isUnique === 'REGULAR_TILE') return false;
  return true
}
const validateImgObjectUniqueness = (imageObj: ImgObj) => {
  if (imageObj.isUnique) return false
  return true
}

const validateMatchInProgress = (tiles: TileData[][]) => {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (tiles[i][j].markedAsMatch) return false
    }
  }
  return true
}

export { validateMatchInProgress, initializeDataSource, renderTiles, recolorMatches, findSwipeDirection, validateTileUniqueness, validateImgObjectUniqueness }