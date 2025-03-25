import Tower from "./tower";

export default class Shop {
    x: number;
    y: number;
    w: number;
    h: number;
    towers: any[];
    constructor(w: number, h: number) {
        this.x = 0;
        this.y = h - 150;
        this.w = w;
        this.h = h;

        this.towers = [
            new Tower(this.x + 10, this.y + 10, this.w / 3 - 20, this.h - 120),
            new Tower(this.x + this.w / 3 + 10, this.y + 10, this.w / 3 - 20, this.h - 120),
            new Tower(this.x + 2 * this.w / 3 + 10, this.y + 10, this.w / 3 - 20, this.h - 120),
        ];

    }
    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = "black";
        ctx.fillRect(this.x, this.y, this.w, this.h);
        for (let i = 0; i < this.towers.length; i++) {
            this.towers[i].draw(ctx);
        }
    }
}