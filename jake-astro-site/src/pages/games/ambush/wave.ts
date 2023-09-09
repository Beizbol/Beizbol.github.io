import Enemy from "./enemy";

export default class Wave {
    mobs: Enemy[] = [];
    waveDelay: number = 0;
    remaining: number = 0;
    living: number = 0;

    get isOver() {
        return this.remaining <= 0 && this.living <= 0;
    }

    constructor(round: number, difficulty: number) {
        const enemies = round + (difficulty - 2) * 0.125 * round;
        this.remaining = enemies;
        this.waveDelay = -5 * difficulty - round + 100;
        for (let i = 0; i < enemies; i++) {
            this.mobs.push(new Enemy(this.waveDelay * (i + 1)));
        }
    }

    spawn() {
        // if (this.waveDelay > 0) {
        //     this.waveDelay -= 1;
        // } else {
        this.remaining -= 1;
        this.living += 1;
        // }
    }

    kill(index: number) {
        this.mobs[index].kill();
        this.living -= 1;
    }
}
