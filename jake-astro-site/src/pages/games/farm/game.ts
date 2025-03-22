
import Menu from "./game/menu";
import Mouse from "./game/input";
import Player from "./game/player";
import { State } from "./game/state";
import Theme from "src/components/Theme.astro";

const STOP = true;

export default class Game {
    mouse: Mouse;
    keys: Map<string, null>;
    pads: Map<number, Gamepad>;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    w: number;
    h: number;
    state: State;
    menu: Menu;
    players: Player[];



    constructor(canvas: HTMLCanvasElement) {
        this.pads = new Map<number, Gamepad>();
        this.players = new Array<Player>(6);
        for (let i = 0; i < 6; i++) {
            this.players[i] = new Player(0, 0);
        }
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        this.w = canvas.width;
        this.h = canvas.height;
        this.state = State.Menu;
        this.menu = new Menu(this.ctx);
        this.mouse = new Mouse(0, 0, false);
        this.keys = new Map<string, null>();

    }




    update(pads: any, dt: number) {
        // console.log("num keys:", this.keys.size);

        if (this.state === State.Menu) {
            this.state = this.menu.update_mouse(this.mouse);
            return;
        }

        if (this.state === State.Pause) {
            return;
        }

        this.players[0].move(this.keys, dt);
        for (let i = 1; i < this.players.length; i++) {
            const _pad = pads[i] as Gamepad;
            if (!_pad) continue;
            this.players[i].show = true;
            // console.log("pads", this.pads,);
            // const _pad = this.pads.get(i - 1) as Gamepad;

            console.log("update, pad", _pad);

            this.players[i].move_pad(_pad, dt);
        }

    }

    draw() {

        if (this.state === State.Menu) return this.menu.draw();

        this.ctx.clearRect(0, 0, this.w, this.h);
        this.ctx.fillStyle = "green";
        this.ctx.fillRect(0, 0, this.w, this.h);


        this.players[0].draw(this.ctx);
        for (let i = 1; i < this.players.length; i++) {
            if (!this.players[i].show) continue;
            this.players[i].draw(this.ctx);
        }

    }

}