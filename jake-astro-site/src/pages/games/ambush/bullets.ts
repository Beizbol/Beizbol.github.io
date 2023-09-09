import Point from "./point";

export default class Bullet {
    pos: Point = new Point(0, 0);
    speed: number = 10;
    damage: number = 10;
    color: string = 'red';
}