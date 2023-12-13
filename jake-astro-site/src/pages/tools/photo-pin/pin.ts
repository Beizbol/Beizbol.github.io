export type PinSide = "left" | "right" | "top" | "bottom";

export default class Pin {
    id: number;
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


    constructor(rect: { left: number; top: number; width: number; height: number; }, txt: string, bg: string, color: string, img: string, side?: PinSide, id?: number) {
        this.id = id ?? Math.random() * 1000
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
        this.w = text.length * 8 + 50;
    }

    move(mx: number, my: number) {
        this.x = mx;
        this.y = my;
    }

    drawTip(_ctx: CanvasRenderingContext2D) {
        const mid = this.x + this.w / 2 - 24;
        switch (this.side) {
            case "left":
                _ctx.beginPath();
                _ctx.moveTo(mid - 40, this.y - 10);
                _ctx.lineTo(mid - 60, this.y);
                _ctx.lineTo(mid - 40, this.y + 10);
                _ctx.closePath();
                _ctx.fill();
                break;
            case "right":
                _ctx.beginPath();
                _ctx.moveTo(mid + 40, this.y - 10);
                _ctx.lineTo(mid + 60, this.y);
                _ctx.lineTo(mid + 40, this.y + 10);
                _ctx.closePath();
                _ctx.fill();
                break;
            case "top":
                _ctx.beginPath();
                _ctx.moveTo(mid - 10, this.y - 5);
                _ctx.lineTo(mid, this.y - 25);
                _ctx.lineTo(mid + 10, this.y - 5);
                _ctx.closePath();
                _ctx.fill();
                break;

            default:
                _ctx.beginPath();
                _ctx.moveTo(mid - 10, this.y + 5);
                _ctx.lineTo(mid, this.y + 25);
                _ctx.lineTo(mid + 10, this.y + 5);
                _ctx.closePath();
                _ctx.fill();
                break;
        }

    }

    drawBody(_ctx: CanvasRenderingContext2D) {
        _ctx.beginPath();
        _ctx.roundRect(this.x - 24, this.y - this.h / 2, this.w, this.h, 5);
        _ctx.closePath();
        _ctx.fill();
    }

    drawIcon(_ctx: CanvasRenderingContext2D) {

        if (this.color) {
            _ctx.filter = "invert(1)";
        }
        _ctx.drawImage(this.icon, this.x - 20, this.y - 12, 24, 24);
        _ctx.filter = "none";
    }

    drawPin(_ctx: CanvasRenderingContext2D) {
        // console.log("pin img ", this.icon);
        _ctx.fillStyle = this.bg;
        this.drawTip(_ctx);
        this.drawBody(_ctx);
        _ctx.fillStyle = this.color;
        this.drawIcon(_ctx);
        _ctx.font = this.font;
        _ctx.fillText(this.text, this.x + 8, this.y + 6);
        // console.log("drawn");
    }

    // place() {
    //     state.placed.push(this);
    //     state.held = null;
    // }

    // drag() {
    //     state.held = this;
    // }

    isMouseOver(mx: number, my: number) {
        return mx > this.x - 36 && mx < this.x - 12 + this.w && my > this.y - 20 && my < this.y + this.h;
    }

    twin() {
        return new Pin({ left: this.x, top: this.y, width: this.w, height: this.h }, this.text, this.bg, this.color, this.icon.src, this.side);
    }

    clone() {
        return new Pin({ left: this.x, top: this.y, width: this.w, height: this.h }, this.text, this.bg, this.color, this.icon.src, this.side, this.id);
    }
}