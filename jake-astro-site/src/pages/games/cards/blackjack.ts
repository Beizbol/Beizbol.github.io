import type Card from "./card";
import Deck from "./deck";

type Hand = Card[];

export default class BlackJack {

    chips: number;
    deck: Deck;
    player: Hand = [];
    dealer: Hand = [];

    constructor(chips: number) {
        this.chips = chips;
        this.deck = new Deck();
    }

    play_hand() {
        if (this.chips < 1) {
            alert("You're out of chips!");
            return;
        }

        this.deck.shuffle();
        this.player = this.deck.draw(2);
        this.dealer = this.deck.draw(2);

    }

    hit() {
        const card = this.deck.draw(1)[0];
        this.player.push(card);
        console.log("hit player:", this.player);
    }

    stand() {
        const score_dealer = BlackJack.count(this.dealer);
        console.log("dealer:", this.dealer, score_dealer);

        const score_player = BlackJack.count(this.player);
        console.log("player:", this.player, score_player);
    }

    static count(hand: Hand) {
        let total = 0;
        for (let i = 0; i < hand.length; i++) {
            total += hand[i].score;
        }
        return total;
    }
}
