
const IDLE = 0;
const JUMP = 1;
const SIZE = 32;

export default class Frog {
    sheet: HTMLImageElement;
    x: number;
    y: number;
    dir: number;
    state: number;
    frame: number;
    n: number;

    constructor() {
        this.x = 4;
        this.y = 15;
        this.dir = 0;
        this.state = IDLE;
        this.frame = 0;
        this.n = 0;
        this.sheet = new Image();
        this.sheet.src = '/frogger/frog.png';
    }

    jump() {
        this.state = JUMP;
        this.frame = 0;
        this.n = 0;
    }

    update(dir: number) {
        this.dir = dir;
        this.n += 1;
        if (this.state === JUMP && this.n > 5) {
            this.n = 0;
            this.frame += 1;
            if (this.frame > 5) {
                this.state = IDLE;
                this.frame = 0;
                switch (dir) {
                    case 0:
                        this.y -= 1;
                        break;
                    case 1:
                        this.x += 1;
                        break;
                    case 2:
                        this.y += 1;
                        break;
                    case 3:
                        this.x -= 1;
                        break;
                }
            }
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        const w = SIZE;
        const h = SIZE;
        const x = this.x * w;
        const y = this.y * h;
        const sy = 0;
        const sx = this.state * this.frame * w;
        // ctx.rotate(Math.PI / 2);
        ctx.translate(x, y);
        ctx.translate(w / 2, h / 2);
        ctx.rotate((this.dir * Math.PI / 2));
        ctx.drawImage(this.sheet, sx, sy, w, h, -w / 2, -h / 2, w, h);
        ctx.rotate((-this.dir * Math.PI / 2));
        ctx.translate(-x, - y);
        ctx.translate(-w / 2, -h / 2);
    }
}