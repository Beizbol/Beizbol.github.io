import Mouse from "./input";
import { State } from "./state";

export default class Menu {
    ctx: CanvasRenderingContext2D;
    starting: number;
    color: string;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
        this.starting = -1;
        this.color = "#444";
    }

    update_pad(pad: Gamepad): State {
        // console.log("pad btns", pad.buttons);
        for (let i = 0; i < pad.buttons.length; i++) {
            if (pad.buttons[i].pressed) {
                console.log("pad btn", i, pad.buttons[i].value);
            }
        }

        if (pad.buttons[0].value > 0) {
            this.starting = 30;
            this.color = "red";
        } else {
            this.color = "#004";
        }

        if (this.starting > 0) {
            this.starting--;
        } else if (this.starting === 0) {
            return State.Play;
        }
        return State.Menu;
    }

    update_mouse(mouse: Mouse): State {

        const x = this.ctx.canvas.width / 2;
        const y = 300;
        if (mouse.x > x - 54 && mouse.x < x + 58 && mouse.y > 269 && mouse.y < 321) {
            this.color = "blue";
            if (mouse.click) {
                this.starting = 5;
                this.color = "red";
            }
        } else {
            this.color = "#444";
        }

        if (this.starting > 0) {
            this.starting--;
        } else if (this.starting === 0) {
            return State.Play;
        }
        return State.Menu;
    }

    draw() {

        this.ctx.fillStyle = "purple";
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        this.ctx.fillStyle = "white";
        this.ctx.font = "48px Arial";
        this.ctx.textAlign = "center";
        this.ctx.fillText("Farm 2 Table", this.ctx.canvas.width / 2, 100);

        // draw play button
        const x = this.ctx.canvas.width / 2;
        const y = 300;
        this.ctx.fillStyle = "#FFF";
        this.ctx.fillRect(x - 54, y - 31, 112, 52);
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(x - 55, y - 32, 110, 50);

        // draw circle
        this.ctx.beginPath();
        this.ctx.arc(x + 32, y - 8, 15, 0, 2 * Math.PI);
        this.ctx.closePath();
        this.ctx.fillStyle = "green";
        this.ctx.fill();

        // draw text
        this.ctx.fillStyle = "white";
        this.ctx.font = "24px Arial";
        this.ctx.textAlign = "center";
        this.ctx.fillText(" Play   A ", x, y);

    }
}