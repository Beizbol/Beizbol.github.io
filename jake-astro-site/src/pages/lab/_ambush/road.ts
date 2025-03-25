import type Point from "./point";

export default class Road {
    turns: Point[] = [];
    end: Point;
    start: Point;

    constructor(turns: Point[]) {
        this.turns = turns;
        this.start = turns[0];
        this.end = turns[turns.length - 1]
    }

}

