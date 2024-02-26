
const suits = ["C", "D", "H", "S"];
const ranks = ["", "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
const values = {
    A: 11, 2: 2, 3: 3, 4: 4, 5: 5,
    6: 6, 7: 7, 8: 8, 9: 9, 10: 10,
    J: 10, Q: 10, K: 10,
}

export default class Card {

    faceUp: boolean = false;
    suit: string;
    rank: string;

    get score() { return values[this.rank]; }

    constructor(suit: number, rank: number) {
        this.suit = suits[suit]
        this.rank = ranks[rank]
    }

    toString() {
        return `${this.suit}-${this.rank}`;
    }

    flip() {
        this.faceUp = !this.faceUp
    }

    show() {
        this.faceUp = true
    }

    hide() {
        this.faceUp = false
    }

}