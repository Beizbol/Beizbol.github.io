use yew::prelude::*;
use yew::{html, Html};

enum Msg {
    AddOne,
}

enum GameState {
    Start,
    Play,
    Win,
    Lose,
    Give,
}
struct Game {
    score: Score,
    state: GameState,
    goalWord: Vec<char>,
    guessCount: i32,
    board: Board,
}

struct Board {
    rows: Vec<Word>,
}

struct Word {
    chars: Vec<char>,
}

struct Score {
    wins: i32,
    fails: i32,
    draws: i32,
    streak: i32,
}

impl Component for Game {
    type Message = Msg;
    type Properties = ();

    fn create(_ctx: &Context<Self>) -> Self {
        Self {
            score: Score {
                wins: 0,
                fails: 0,
                draws: 0,
                streak: 0,
            },
            state: GameState::Start,
            goalWord: vec!['c', 'h', 'a', 'r', 's'],
            guessCount: 0,
            board: Board {
                rows: vec![Word {
                    chars: vec![' ', ' ', ' ', ' ', ' '],
                }],
            },
        }
    }

    fn update(&mut self, _ctx: &Context<Self>, msg: Self::Message) -> bool {
        match msg {
            Msg::AddOne => {
                self.score.wins += 1;
                true
            }
        }
    }

    fn changed(&mut self, ctx: &Context<Self>) -> bool {
        true
    }

    fn view(&self, ctx: &Context<Self>) -> Html {
        // This gives us a component's "`Scope`" which allows us to send messages, etc to the component.
        let link = ctx.link();
        let items = (1..=10).collect::<Vec<_>>();
        html! {
            <div>
                <div>
                    <span>{"J"}</span>
                    <span>{"W"}</span>
                    <span>{"O"}</span>
                    <span>{"R"}</span>
                    <span>{"D"}</span>
                </div>
                <h1>{"jWordle"}</h1>
                <button onclick={link.callback(|_| Msg::AddOne)}>{ "+1" }</button>
                <p>{ "Score: {self.score}"}</p>
                <ul class="item-list">
                    { items.iter().collect::<Html>() }
                </ul>
            </div>
        }
    }

    fn rendered(&mut self, ctx: &Context<Self>, first_render: bool) {}

    fn destroy(&mut self, ctx: &Context<Self>) {}
}

fn main() {
    yew::start_app::<Game>();
}
