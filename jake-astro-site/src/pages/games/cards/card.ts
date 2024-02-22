
const suits = ["♣", "♦", "♥", "♠️"];

const ranks = ["", "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]

export default class Card {

    faceUp: boolean = false;
    suit: string;
    rank: string;

    get score() { return ranks.indexOf(this.rank); }

    constructor(suit: number, rank: number) {
        this.suit = suits[suit]
        this.rank = ranks[rank]
    }

    toString() {
        return this.rank + this.suit
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