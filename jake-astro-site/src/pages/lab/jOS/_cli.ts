
import { Terminal } from "@xterm/xterm";


const arrow = {
    up: "[A",
    down: "[B",
    left: "[C",
    right: "[D",
};

const backspace = "\x7F";
const enter = "\r";

const tag = "\r\n$ ";

export default class Cli {
    fs: FileSystem;
    term: Terminal;
    buf: Array<string> = [];
    idx: number = 0;

    constructor(div: HTMLDivElement, fs: FileSystem) {
        this.fs = fs;
        this.term = new Terminal();
        this.term.open(div);
        this.term.write("\x1B[1;3;31mjOS v0.1\x1B[0m | Welcome! try 'help'");
        this.term.write(tag);
        this.term.onData((e) => this.w(e));
    }

    input(str: string): string {

        return this.exe(str.split(" "));
    }



    w(k: any) {
        switch (k) {
            case arrow.left:
                if (idx <= 0) break;
                idx -= 1;
                term.write(k);
                break;
            case arrow.right:
                if (idx >= buf.length) break;
                idx += 1;
                term.write(k);
                break;
            case arrow.up:
            case arrow.down:
                // console.log(k);
                break;
            case backspace:
                this.term.write("\b \b");
                this.buf.pop();
                break;
            case enter:
                const args = this.buf.join("").split(" ");
                console.log("args", args);
                exe(args);
                term.write(tag);
                break;
            default:
                this.term.write(k);
                this.buf.push(k);
        }
    }

    exe(argv: any) {
        console.log("argv: ");
        this.term.write("\r\n");
        switch (argv[0]) {
            case "close":
            case "exit":
            case "quit":
            case "reset":
            case "reboot":
            case "clr":
            case "clear":
                this.term.clear();
                break;
            case "echo":
                const str = argv.slice(1).join(" ");
                this.term.write(str);
                break;
            case "help":
                this.term.write(help_str);
                break;
            //case "sf":
            case "cd":
                cd(argv.slice(1));
                break;
            case "dir":
            case "vf":
            case "ls":
                ls(argv.slice(1));
                break;
            case "copy":
            case "cp":
                copy(argv.slice(1));
                break;
            case "move":
            case "mv":
                move(argv.slice(1));
                break;
            case "rm":
            case "del":
                del(argv.slice(1));
                break;
            case "code":
            case "vscode":
            case "open":
                code(argv.slice(1));
                break;
            case "text":
            case "txt":
            case "write":
            case "notes":
            case "notepad":
                notes(argv.slice(1));
                break;
            default:
                this.term.write("command not found. try: help");
        }
        this.buf = [];
    }
}



//TODO
function cd(args: any) {
    if (args.length != 1) {
        term.write("sf: needs 1 args - got: ", args.length);
        return;
    }
}

//TODO
function ls(args: any) {
    if (args.length != 0) {
        term.write("vf: needs 0 args - got: ", args.length);
        return;
    }
}

//TODO
function code(args: any) {
    if (args.length != 1) {
        term.write("code: needs 1 args - got: ", args.length);
        return;
    }
}

//TODO
function files(args: any) {
    if (args.length != 1) {
        term.write("files: needs 1 args - got: ", args.length);
        return;
    }
}

//TODO
function notes(args: any) {
    if (args.length != 1) {
        term.write("text: needs 1 args - got: ", args.length);
        return;
    }
}

//TODO
function make(args: any) {
    if (args.length != 1) {
        term.write("make: needs 1 args - got: ", args.length);
        return;
    }
}

//TODO
function move(args: any) {
    if (args.length != 2) {
        term.write("move: needs 2 args - got: ", args.length);
        return;
    }
}

//TODO
function copy(args: any) {
    if (args.length != 2) {
        term.write("copy: needs 2 args - got: ", args.length);
        return;
    }
}

//TODO
function del(args: any) {
    if (args.length != 1) {
        term.write("del: needs 1 args - got: ", args.length);
        return;
    }
}



