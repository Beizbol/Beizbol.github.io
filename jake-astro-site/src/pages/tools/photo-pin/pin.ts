export type PinSide = "left" | "right" | "top" | "bottom";

export enum PinState {
    New,
    Held,
    Placed,
    Selected
}

export default class Pin {
    id: number;
    ctx: CanvasRenderingContext2D;
    x: number;
    y: number;
    w: number;
    h: number;
    text: string;
    icon: HTMLImageElement;
    bg: string;
    font: string;
    color: string;
    side: PinSide;

    constructor(ctx: CanvasRenderingContext2D, rect: { left: number; top: number; width: number; height: number; }, txt: string, bg: string, color: string, img: string, side?: PinSide, id?: number) {
        this.id = id ?? Math.random() * 1000
        this.ctx = ctx;
        this.x = rect.left;
        this.y = rect.top;
        this.w = rect.width;
        this.h = rect.height;
        this.text = txt;
        this.icon = new Image()
        this.icon.src = img;
        this.bg = bg;
        this.color = color;
        this.side = side ?? "bottom";
        this.font = "16px sans-serif";

    }

    updateIcon(img: string) {
        this.icon.src = img;
    }

    updateText(text: string) {
        this.text = text;
        const info = this.ctx.measureText(text);
        this.w = info.width + 48;

    }

    move(mx: number, my: number) {
        this.x = mx;
        this.y = my;
    }

    drawTip() {
        const mid = this.x + this.w / 2 - 24;
        switch (this.side) {
            case "left":
                this.ctx.beginPath();
                this.ctx.moveTo(mid - 40, this.y - 10);
                this.ctx.lineTo(mid - 60, this.y);
                this.ctx.lineTo(mid - 40, this.y + 10);
                this.ctx.closePath();
                this.ctx.fill();
                break;
            case "right":
                this.ctx.beginPath();
                this.ctx.moveTo(mid + 40, this.y - 10);
                this.ctx.lineTo(mid + 60, this.y);
                this.ctx.lineTo(mid + 40, this.y + 10);
                this.ctx.closePath();
                this.ctx.fill();
                break;
            case "top":
                this.ctx.beginPath();
                this.ctx.moveTo(mid - 10, this.y - 5);
                this.ctx.lineTo(mid, this.y - 25);
                this.ctx.lineTo(mid + 10, this.y - 5);
                this.ctx.closePath();
                this.ctx.fill();
                break;

            default:
                // console.log(this.ctx);
                this.ctx.beginPath();
                this.ctx.moveTo(mid - 10, this.y + 5);
                this.ctx.lineTo(mid, this.y + 25);
                this.ctx.lineTo(mid + 10, this.y + 5);
                this.ctx.closePath();
                this.ctx.fill();
                break;
        }

    }

    drawBody() {
        this.ctx.beginPath();
        this.ctx.roundRect(this.x - 24, this.y - this.h / 2, this.w, this.h, 5);
        this.ctx.closePath();
        this.ctx.fill();
    }

    drawIcon() {

        if (this.color) {
            this.ctx.filter = "invert(1)";
        }
        console.log("icon", this.icon);
        this.ctx.drawImage(this.icon, this.x - 20, this.y - 12, 24, 24);
        this.ctx.filter = "none";
    }

    drawPin() {
        // console.log("pin img ", this.icon);
        this.ctx.fillStyle = this.bg;
        this.drawTip();
        this.drawBody();
        this.ctx.fillStyle = this.color;
        this.drawIcon();
        this.ctx.font = this.font;
        this.ctx.fillText(this.text, this.x + 8, this.y + 6);
        // console.log("drawn");
    }

    isMouseOver(mx: number, my: number) {
        return mx > this.x - 36 && mx < this.x - 12 + this.w && my > this.y - 20 && my < this.y + this.h;
    }

    twin(_ctx: CanvasRenderingContext2D) {
        return new Pin(_ctx, { left: this.x, top: this.y, width: this.w, height: this.h }, this.text, this.bg, this.color, this.icon.src, this.side);
    }

    clone() {
        return new Pin(this.ctx, { left: this.x, top: this.y, width: this.w, height: this.h }, this.text, this.bg, this.color, this.icon.src, this.side, this.id);
    }
}