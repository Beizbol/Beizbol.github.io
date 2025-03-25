import { log } from "node_modules/astro/dist/core/logger/core";
import type Enemy from "./enemy";
import Point from "./point";

export default class Tower {
    x: number;
    y: number;
    w: number;
    h: number;
    get center() { return { x: this.x + this.w / 2, y: this.y + this.h / 2 } }

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

    constructor(x: number, y: number, w: number, h: number) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.name = 'Tower';
        this.description = 'A tower';
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = "navy";
        ctx.fillRect(this.x, this.y, this.w, this.h);
        // console.log("tower.draw:", this);
    }

    fire(enemy: Enemy) {
        // console.log("tower.firing:", this);
        enemy.damage(this.damage);
        this.cooldown = this.shot_delay;
        this.color = 'purple';
    }

    getName() {
        return this.name;
    }

    getDescription() {
        return this.description;
    }
}