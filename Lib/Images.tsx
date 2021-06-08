export const PINK_BEAN = require("../assets/pinkBean.png");
export const PURPLE_BEAN = require("../assets/purpleBean.png");
export const BLUE_BEAN = require("../assets/blueBean.png");
export const ORANGE_BEAN = require("../assets/orangeBean.png");
export const GREEN_BEAN = require("../assets/greenBean.png");
export const YELLOW_BEAN = require("../assets/yellowBean.png");
export const RED_BEAN = require("../assets/redBean.png");
export const DOUGHNUT_TILE = require("../assets/doughnutTile.png");
export const LOLLIPOP_TILE = require("../assets/lollipop.png");
export const SMELLY_CHEESE_TILE = require("../assets/smellyCheese.png");

export const BEANS = [PINK_BEAN, PURPLE_BEAN, BLUE_BEAN, ORANGE_BEAN, GREEN_BEAN, YELLOW_BEAN, RED_BEAN]

const COLORS = {
    BLUE: 1,
    RED: 2,
    YELLOW: 3,
    PINK: 4,
    PURPLE: 5,
    ORANGE: 6,
    GREEN: 7,
}
export const PINK_BEAN_OBJ = {
    image: PINK_BEAN,
    color: COLORS.PINK,
    isUnique: false
}
export const BLUE_BEAN_OBJ = {
    image: BLUE_BEAN,
    color: COLORS.BLUE,
    isUnique: false
}
export const RED_BEAN_OBJ = {
    image: RED_BEAN,
    color: COLORS.RED,
    isUnique: false
}
export const PURPLE_BEAN_OBJ = {
    image: PURPLE_BEAN,
    color: COLORS.PURPLE,
    isUnique: false
}
export const YELLOW_BEAN_OBJ = {
    image: YELLOW_BEAN,
    color: COLORS.YELLOW,
    isUnique: false
}
export const GREEN_BEAN_OBJ = {
    image: GREEN_BEAN,
    color: COLORS.GREEN,
    isUnique: false
}
export const ORANGE_BEAN_OBJ = {
    image: ORANGE_BEAN,
    color: COLORS.ORANGE,
    isUnique: false
}

export const uniqueTiles = {
    DOUGHNUT_TILE: {
        image: DOUGHNUT_TILE,
        color: 0,
        isUnique: true
    },
    LOLLIPOP_TILE: {
        image: LOLLIPOP_TILE,
        color: 0,
        isUnique: true
    },
    SMELLY_CHEESE_TILE: {
        image: SMELLY_CHEESE_TILE,
        color: 0,
        isUnique: true
    }
}

export const BEAN_OBJS = [PINK_BEAN_OBJ, PURPLE_BEAN_OBJ, BLUE_BEAN_OBJ, ORANGE_BEAN_OBJ, GREEN_BEAN_OBJ, YELLOW_BEAN_OBJ, RED_BEAN_OBJ]