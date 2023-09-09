import type Enemy from "./enemy";
import Point from "./point";

export default class Tower {
    size = 30;
    pos: Point = new Point(340, 135);
    get center() { return { x: this.pos.x + this.size / 2, y: this.pos.y + this.size / 2 } }

    name: string;
    description: string;
    damage: number = 24;
    range: number = 100;
    cooldown: number = 0;
    reload_delay: number = 50;
    shot_delay: number = 50;
    price = 10;
    color = 'darkblue';
    selected: boolean = true;
    bullets: Point[] = [];

    constructor() {
        this.name = 'Tower';
        this.description = 'A tower';
    }

    fire(enemy: Enemy) {
        // console.log("tower.firing:", this);
        enemy.damage(this.damage);
        this.cooldown = this.shot_delay;
        this.color = 'darkblue';
    }

    getName() {
        return this.name;
    }

    getDescription() {
        return this.description;
    }
}