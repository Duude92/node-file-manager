import { CommandBase } from "../../commandBase.js";
import { createReadStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { EOL } from "node:os";

const encoding = 'utf8';

class CommandCat extends CommandBase {
    constructor() {
        super("cat");
        this._usage = `cat [FILE]`;
        this._description = 'Print FILE content to stdout';
    }
    validateParameters(args) {
        return args.length > 0;
    }

    async performCommand(args) {
        const filePath = this._pathHandler.resolvePath(args[0]);
        await pipeline(createReadStream(filePath, encoding), process.stdout, { end: false });
        process.stdout.write(EOL);
    }
}
export const createCommand = () => new CommandCat();