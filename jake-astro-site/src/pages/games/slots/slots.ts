export default class Slots {

    reels: number[][];

    static bets = [50, 100, 250, 500, 1000];

    static symbols = [
        "/assets/slots/lime.svg",
        "/assets/slots/beach-flipflop.svg",
        "/assets/slots/cocktail.svg",
        "/assets/slots/beach-ocean.svg",
        "/assets/slots/beach-ball.svg",
        "/assets/slots/flippers.svg",
        "/assets/slots/lime.svg",
        "/assets/slots/beach-flipflop.svg",
        "/assets/slots/cocktail.svg",
        "/assets/slots/beach-ocean.svg",
        "/assets/slots/beach-ball.svg",
        "/assets/slots/flippers.svg",
    ];

    scoring_lines: number[];
    points: number;

    constructor() {
        this.reels = [[0, 1, 2, 3, 4, 5], [0, 1, 2, 3, 4, 5], [0, 1, 2, 3, 4, 5], [0, 1, 2, 3, 4, 5], [0, 1, 2, 3, 4, 5],];
        this.scoring_lines = [0, 1, 2];
        this.points = 4000;
    }

    spin() {

        const bet = this.scoring_lines.length * 50;
        this.points -= bet;
        const len = this.reels.length;
        for (let i = 0; i < len; i++) {
            Slots.shuffle(this.reels[i]);
        }
    }

    judge() {
        console.log("judge");

        let total = 0;
        for (let i = 0; i < this.scoring_lines.length; i++) {
            const idx = this.scoring_lines[i];
            total += this.score(idx);
        }
        this.points += total;
    }

    score(idx: number): number {
        const line = [];
        for (let i = 0; i < this.reels.length; i++) {
            line.push(this.reels[i][idx]);
        }
        return Slots.score_line(line);
    }

    static score_line(line: number[]): number {
        let last = line[0];
        let count = 0;
        let max = 0;
        for (let i = 0; i < line.length; i++) {
            if (line[i] !== last) {
                max = Math.max(max, count);
                count = 1;
            } else {
                count++;
                max = Math.max(max, count);
            }
            last = line[i];
        }

        console.log("max", max);
        console.log("line", line);

        if (max < 3) return 0;

        return (max - 1) * 2500;
    }

    static shuffle(reel: number[]) {
        for (let n = 0; n < 1000; n++) {
            const r = Math.floor(Math.random() * reel.length);
            const t = reel[r];
            reel[r] = reel[0];
            reel[0] = t;
        }
    }

}
