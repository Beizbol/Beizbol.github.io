import Pin from './pin';

export type Placed = Pin[];

export default class PinHist {
    undos: Placed[];
    redos: Placed[];

    constructor() {
        this.undos = [];
        this.redos = [];
    }

    update(placed: Placed) {
        this.redos = [];
        this.undos.push(placed);
    }

    undo() {
        const tmp = this.undos.pop();
        if (tmp) {
            this.redos.push(tmp);
            return tmp;
        }
        console.log("No more undo");

    }

    redo() {
        const tmp = this.redos.pop();
        if (tmp) {
            this.undos.push(tmp);
            return tmp;
        }
        console.log("No more redo");
        return tmp;
    }
}