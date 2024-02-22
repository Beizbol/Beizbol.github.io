import Card from "./card"

export default class Deck {

    cards: Card[] = []

    constructor() {
        for (let i = 0; i < 4; i++) {
            for (let j = 1; j <= 13; j++) {
                this.cards.push(new Card(i, j))
            }
        }
    }

    shuffle(max_iter: number = 1000) {
        const last = this.cards.length - 1;
        for (let n = 0; n < max_iter; n++) {
            const i = n % last;
            const temp = this.cards[i];
            const rdm = Math.floor(Math.random() * last);
            this.cards[i] = this.cards[rdm];
            this.cards[rdm] = temp;
        }
    }

    draw(n: number = 2) {
        return this.cards.splice(0, n)
    }

    toString() {
        return this.cards.map(card => card.toString()).join(' ')
    }

}