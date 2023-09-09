import Point from "./point";


export default class Enemy {
    pos: Point = new Point(0, 0);
    health: number = 100;
    color: string = 'hsl(100, 100%, 50%)';
    delay: number = 0;
    value: number = 10;
    speed: number = 1;
    shield: number = 0;
    description: string;
    target: number = 0;



    get isWaiting() {
        return this.delay >= 0;
    }

    get isDead() {
        return this.health <= 0;
    }

    constructor(delay: number) {
        this.delay = delay;
        this.description = "An enemy";
    }

    hasReached(end: Point) {

        return (this.pos.x == end.x && this.pos.y == end.y)
    }

    kill() {
        this.health = 0;
    }

    wait() {
        this.delay -= 1;
    }

    move(pt: Point) {

        let dx = pt.x - this.pos.x;
        let dy = pt.y - this.pos.y;

        if (dx == 0 && dy == 0) {
            this.target += 1;
        } else if (dx > 0) {
            this.pos.x += this.speed;
        } else if (dx < 0) {
            this.pos.x -= this.speed;
        } else if (dy > 0) {
            this.pos.y += this.speed;
        } else if (dy < 0) {
            this.pos.y -= this.speed;
        }

    }

    damage(amount: number) {
        if (this.shield > 0) {
            this.shield -= amount;
            if (this.shield < 0) {
                this.shield = 0;
            }
        } else {
            this.health -= amount;
            this.color = `hsl(${this.health}, 100%, 50%)`;
            // console.log("enemy.hit:", this);
        }
    }

    isAlive() {
        return this.health > 0;
    }
}
