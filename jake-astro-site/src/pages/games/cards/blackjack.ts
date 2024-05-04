import type Card from "./card";
import Deck from "./deck";

type Hand = Card[];

type Hit = "bust" | "21" | "hit";

type Deal = "deal" | "21" | "split" | "poor"

type Stand = Judge | "split" | Judge[];

type Judge = "21" | "bust" | "win" | "lose" | "draw";

type Split = "" | "poor";

export default class BlackJack {

    bet: number;
    chips: number;
    deck: Deck;
    once: boolean;
    isSplit: boolean;
    player: Hand = [];
    player_split: Hand = [];
    dealer: Hand = [];

    constructor(chips: number) {
        this.once = false;
        this.isSplit = false;
        this.bet = 5;
        this.chips = chips;
        this.deck = new Deck();
    }

    reset() {
        this.once = false;
        this.isSplit = false;
        this.player = [];
        this.player_split = [];
        this.dealer = [];
        this.deck = new Deck();
    }

    deal(bet: number): Deal {

        this.reset();

        if (this.chips < bet) {
            alert("Not enough chips!");
            return "poor";
        }
        this.bet = bet;
        this.chips -= bet;
        this.deck.shuffle();
        this.player = this.deck.draw(2);
        this.dealer = this.deck.draw(2);

        if (this.player[0].rank === this.player[1].rank) {
            return "split";
        }
        const score_player = BlackJack.count(this.player);
        if (score_player === 21) {
            return "21";
        }
        return "deal";
    }

    hit(): Hit {
        const card = this.deck.draw(1)[0];
        this.player.push(card);
        console.log("hit player:", this.player);
        const score_player = BlackJack.count(this.player);
        if (score_player === 21) {
            this.payout("21");
            return "21";
        }
        if (score_player > 21) {
            return "bust";
        }
        return "hit";
    }

    stand(): Stand {

        if (!this.once && this.isSplit) {
            this.once = true;
            return "split";
        }

        // dealer plays
        while (BlackJack.count(this.dealer) < 17) {
            const card = this.deck.draw(1)[0];
            this.dealer.push(card);
            console.log("hit dealer:", this.dealer);
        }

        const score_dealer = BlackJack.count(this.dealer);
        const score_player = BlackJack.count(this.player);
        const res_player = BlackJack.judge(score_player, score_dealer);

        if (this.isSplit) {
            const score_split = BlackJack.count(this.player_split);
            const res_split = BlackJack.judge(score_split, score_dealer);
            return [res_player, res_split];
        }

        return res_player;
    }

    split(): Split {
        if (this.chips < this.bet) {
            alert("You're out of chips!");
            return "poor";
        }
        this.chips -= this.bet;
        this.bet += this.bet;
        this.player_split.push(this.player.pop()!);
        this.player.push(this.deck.draw(1)[0]);
        this.player_split.push(this.deck.draw(1)[0]);
        console.log("split player:", this.player, this.player_split);
        this.isSplit = true;
        return "";
    }

    payout(result: Judge) {
        switch (result) {
            case "21":
                this.chips += this.bet * 3;
                break;
            case "win":
                this.chips += this.bet * 2;
                break;
            case "draw":
                this.chips += this.bet;
                break;
            default:
                break;
        }
    }

    static judge(score_player: number, score_dealer: number): Judge {
        if (score_player > 21) {
            return "lose";
        }
        if (score_dealer > 21) {
            return "win";
        }
        if (score_player > score_dealer) {
            return "win";
        }
        if (score_player < score_dealer) {
            return "lose";
        }
        return "draw";
    }

    static count(hand: Hand) {
        let total = 0;
        let ace = false;
        for (let i = 0; i < hand.length; i++) {
            total += hand[i].score;
            if (hand[i].rank === "A") {
                ace = true;
            }
        }
        if (total > 21 && ace) {
            total -= 10;
        }
        return total
    }
}


