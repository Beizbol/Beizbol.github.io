import { timerMessage } from "astro/dist/core/logger/core";

const VALS = ["A", "9", "10", "J", "Q", "K"];
const SUITS = ["♣", "♦", "♥", "♠"];

export default class Euchre {
    constructor() {
        this.hands = [new Hand(), new Hand(), new Hand(), new Hand()]
        this.deck = new Deck()
        this.flipped = null
        this.dealerIdx = 0
        this.playerIdx = 0
        this.trump = ""
    }

    deal() {
        this.deck.shuffle()
        for (let i = 0; i < this.hands.length; i++) {
            let hand = this.hands[i]
            hand.clear(this.deck.cards)
            for (let j = 0; j < 5; j++) {
                this.deck.mix()
                hand.cards.push(this.deck.draw())
            }
            console.log(`Hand ${i}`)
            this.logCards(hand.cards)
        }
        this.flipped = this.deck.draw()
        console.log("Flipped:")
        this.logCards([this.flipped])
        this.logCards(this.deck.cards)
    }

    chooseDealer() {
        this.deck.shuffle()
        this.dealerIdx = this.deck.firstBlackJack() % this.hands.length
    }

    chooseTrump() {

        array = []
        for (let i = this.dealerIdx; i < this.dealerIdx + this.hands.length; i++) {
            const idx = i % this.hands.length
            if (idx == playerIdx) {
                this.player.ask("Pass or Order up")
            } else if (Math.random() < 0.25) {

            }
        }
        this.trump = this.flipped.suit

        this.trump = this.flipped.suit
    }

    askPlayer(msg) {
        while (this.flag) {
            thread.s
        }
    }

    logCards(cards) {
        console.log(cards.map(c => JSON.stringify(c)).join(', '))
    }

    play() {
        this.chooseDealer()
        this.deal()
        this.chooseTrump()
        for (let i = 0; i < this.hands.length; i++) {
            const element = array[i];

        }
    }

    test() {
        this.play()
    }
}

// class Player {
//     ask()
// }

class Card {

    constructor(value, suit) {
        this.value = value
        this.suit = suit
    }

    play() {

    }

}

class Hand {
    constructor() {
        this.cards = []
    }

    clear(deck) {
        for (let i = 0; i < this.cards.length; i++) {
            deck.push(this.cards.pop())
        }
    }

    playCard() {

    }
}

class Deck {
    constructor() {
        let deck = []

        for (let i = 0; i < VALS.length; i++) {
            for (let j = 0; j < SUITS.length; j++) {
                deck.push(new Card(VALS[i], SUITS[j]))
            }
        }

        this.cards = deck
    }

    draw() {
        return this.cards.pop()
    }

    firstBlackJack() {
        const idx = this.cards.findIndex(this.isBJ)
        console.log(idx)
        return idx
    }

    isBJ(card) {
        return card == new Card("J", "♠") || card == new Card("J", "♣")
    }

    mix() {
        this.shuffle(1)
    }

    shuffle(rounds = 1000) {
        for (let rnds = 0; rnds < rounds; rnds++) {
            for (let i = 0; i < this.cards.length; i++) {
                const card = this.cards.pop()
                const idx = Math.floor(Math.random() * this.cards.length)
                this.cards.splice(idx, 0, card)
            }
        }
    }
}
