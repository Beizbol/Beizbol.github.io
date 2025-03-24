export default class World {

    cars: Array<Cell>;
    logs: Array<Cell>;

    constructor() {
        this.cars = [new Cell(0, 0)];
        this.logs = [new Cell(0, 0)];
    }

    update() {
        for (let i = 0; i < this.cars.length; i++) {
            this.cars[i].x += 1;
        }
        for (let i = 0; i < this.logs.length; i++) {
            this.logs[i].x += 1;
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        const S = 32;
        for (let i = 0; i < this.cars.length; i++) {
            ctx.fillStyle = "red";
            ctx.fillRect(this.cars[i].x * S, this.cars[i].y * S, S, S);
        }
        for (let i = 0; i < this.logs.length; i++) {
            ctx.fillStyle = "green";
            ctx.fillRect(this.logs[i].x * S, this.logs[i].y * S, S, S);
        }
    }

}

export class Cell {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}