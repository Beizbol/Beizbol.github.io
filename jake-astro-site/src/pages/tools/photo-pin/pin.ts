
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
    font_size: number;
    color: string;
    side: PinSide;
    static scale: number = 1.69;

    constructor(ctx: CanvasRenderingContext2D, rect: { left: number; top: number; width: number; height: number; }, txt: string, bg: string, color: string, img: string, side?: PinSide, id?: number) {
        this.id = id ?? Math.random() * 1000000
        this.ctx = ctx;
        this.x = rect.left;
        this.y = rect.top;
        this.w = rect.width;
        this.h = rect.height;
        this.text = txt;
        this.icon = new Image()
        this.icon.src = img;
        this.icon.onload = () => {
            this.drawIcon();
        }
        this.bg = bg;
        this.color = color;
        this.side = side ?? "bottom";
        this.font_size = 16;
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
        const k = Pin.scale;
        const mid = this.x + (k * this.w / 2) - (k * 24);
        switch (this.side) {
            case "left":
                this.ctx.beginPath();
                this.ctx.moveTo(mid - k * 40, this.y - k * 10);
                this.ctx.lineTo(mid - k * 60, this.y);
                this.ctx.lineTo(mid - k * 40, this.y + k * 10);
                this.ctx.closePath();
                this.ctx.fill();
                break;
            case "right":
                this.ctx.beginPath();
                this.ctx.moveTo(mid + k * 40, this.y - k * 10);
                this.ctx.lineTo(mid + k * 60, this.y);
                this.ctx.lineTo(mid + k * 40, this.y + k * 10);
                this.ctx.closePath();
                this.ctx.fill();
                break;
            case "top":
                this.ctx.beginPath();
                this.ctx.moveTo(mid - k * 10, this.y - k * 5);
                this.ctx.lineTo(mid, this.y - k * 25);
                this.ctx.lineTo(mid + k * 10, this.y - k * 5);
                this.ctx.closePath();
                this.ctx.fill();
                break;

            default:
                // console.log(this.ctx);
                this.ctx.beginPath();
                this.ctx.moveTo(mid - k * 10, this.y + k * 5);
                this.ctx.lineTo(mid, this.y + k * 25);
                this.ctx.lineTo(mid + k * 10, this.y + k * 5);
                this.ctx.closePath();
                this.ctx.fill();
                break;
        }

    }

    drawBody() {
        const k = Pin.scale;
        this.ctx.beginPath();
        this.ctx.roundRect(this.x - k * 24, this.y - (k * this.h / 2), k * this.w, k * this.h, k * 5);
        this.ctx.closePath();
        this.ctx.fill();
    }

    drawIcon() {
        if (this.color) {
            this.ctx.filter = "invert(1)";
        }
        const k = Pin.scale;
        this.ctx.drawImage(this.icon, this.x - k * 20, this.y - k * 12, k * 24, k * 24);
        this.ctx.filter = "none";
    }

    drawPin() {
        // console.log("pin img ", this.icon);
        this.ctx.fillStyle = this.bg;
        this.drawTip();
        this.drawBody();
        this.ctx.fillStyle = this.color;
        this.drawIcon();
        const k = Pin.scale;
        const px = this.font_size * k;
        this.ctx.font = `${px}px sans-serif`;
        this.ctx.fillText(this.text, this.x + k * 8, this.y + k * 6);
        // console.log("drawn");
    }

    isMouseOver(mx: number, my: number) {
        const k = Pin.scale;
        return mx > this.x - k * 30 && mx < this.x - k * 16 + k * this.w && my > this.y - k * 20 && my < this.y + k * this.h;
    }

    twin(_ctx: CanvasRenderingContext2D) {
        return new Pin(_ctx, { left: this.x, top: this.y, width: this.w, height: this.h }, this.text, this.bg, this.color, this.icon.src, this.side);
    }

    clone() {
        return new Pin(this.ctx, { left: this.x, top: this.y, width: this.w, height: this.h }, this.text, this.bg, this.color, this.icon.src, this.side, this.id);
    }
}