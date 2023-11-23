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


    constructor(rect: { left: number; top: number; width: number; height: number; }, txt: string, bg: string, color: string, img: string, id?: number) {
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

    drawPin(_ctx: CanvasRenderingContext2D) {
        // console.log("pin img ", this.icon);

        _ctx.fillStyle = this.bg;
        // draw pin tip
        _ctx.beginPath();
        const mid = this.x + this.w / 2 - 24;
        _ctx.moveTo(mid - 10, this.y + 5);
        _ctx.lineTo(mid, this.y + 25);
        _ctx.lineTo(mid + 10, this.y + 5);
        _ctx.closePath();
        _ctx.fill();

        // draw pin body
        _ctx.beginPath();
        _ctx.roundRect(this.x - 24, this.y - this.h / 2, this.w, this.h, 5);
        _ctx.closePath();
        _ctx.fill();

        // // draw pin icon
        _ctx.fillStyle = this.color;
        if (this.color) {
            _ctx.filter = "invert(1)";
        }
        _ctx.drawImage(this.icon, this.x - 20, this.y - 12, 24, 24);
        _ctx.filter = "none";

        // // draw pin text
        // _ctx.fillStyle = this.color;
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
        return new Pin({ left: this.x, top: this.y, width: this.w, height: this.h }, this.text, this.bg, this.color, this.icon.src);
    }

    clone() {
        return new Pin({ left: this.x, top: this.y, width: this.w, height: this.h }, this.text, this.bg, this.color, this.icon.src, this.id);
    }
}