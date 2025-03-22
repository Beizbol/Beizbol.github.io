export default class Player {
    x: number
    y: number
    w: number
    h: number
    show: boolean

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.w = 10;
        this.h = 10;
        this.show = true;
    }

    move(keys: Map<string, null>, dt: number) {
        if (keys.has("w")) {
            console.log("up, dt", dt);
            this.y -= 0.1 * dt;
        }
        if (keys.has("s")) {
            console.log("down");
            this.y += 0.1 * dt;
        }
        if (keys.has("a")) {
            console.log("left");
            this.x -= 0.1 * dt;
        }
        if (keys.has("d")) {
            console.log("right");
            this.x += 0.1 * dt;
        }
    }

    move_pad(pad: Gamepad, dt: number) {

        console.log("padbtns", pad.buttons);


        const left_stick_x = pad.axes[0];
        const left_stick_y = pad.axes[1];
        const right_stick_x = pad.axes[2];
        const right_stick_y = pad.axes[3];

        this.x += left_stick_x * dt;
        this.y += left_stick_y * dt;

        this.x -= right_stick_x * dt;
        this.y -= right_stick_y * dt;

    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}