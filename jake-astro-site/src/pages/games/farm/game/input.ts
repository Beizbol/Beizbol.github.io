export default class Mouse {
    x: number;
    y: number;
    click: boolean;
    constructor(x: number, y: number, click: boolean) {
        this.x = x;
        this.y = y;
        this.click = click;
    }
}