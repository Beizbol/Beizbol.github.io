import Pin from './pin';

export type Placed = Pin[];

export default class PinHist {
    undos: Placed[];
    curr: Placed;
    redos: Placed[];

    constructor() {
        this.undos = [];
        this.redos = [];
        this.curr = [];
    }

    update(placed: Placed) {
        this.undos.push([...this.curr]);
        this.curr = [...placed];
        this.redos = [];
        this.print("Update:");
    }

    undo() {
        const tmp = this.undos.pop();
        if (tmp) {
            this.redos.push([...this.curr]);
            this.curr = tmp;
        }
        this.print("Undo:");
        return this.curr;
    }

    redo() {
        const tmp = this.redos.pop();
        if (tmp) {
            this.undos.push([...this.curr]);
            this.curr = tmp;
        }
        this.print("Redo:");
        return this.curr;
    }

    print(str: string) {
        console.log(str);//, "\n curr", this.curr, "\n undos", this.undos, "\n redos", this.redos);
    }
}