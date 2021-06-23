import {
    Animated,
} from "react-native";

export class TileData {
    public key: number;
    public location: Animated.ValueXY;
    public imageObj: any;
    public scale: Animated.Value;
    public rotation: Animated.Value;
    public markedAsMatch: boolean;
    public isUnique: string;
    constructor(imageObj: {
        image: any;
        color: number;
        isUnique: boolean;
    }, key: number, isUnique: string) {
        this.isUnique = isUnique
        this.markedAsMatch = false
        this.key = key;
        this.location = new Animated.ValueXY();
        this.imageObj = imageObj;
        this.scale = new Animated.Value(1.2);
        this.rotation = new Animated.Value(0)
    }
}


