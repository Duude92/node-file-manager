import {CommandBase} from "../../commandBase.js";
import fs from 'node:fs/promises';
import {displayResultLine} from "../../../messages/messageManager.mjs";

class CommandRm extends CommandBase {
    constructor() {
        super('rm');
        this._usage = `rm [FILE]`;
        this._description = `Removes FILE from disk`;
    }

    validateParameters(args) {
        return args.length > 0;
    }

    async performCommand(args) {
        const filePath = this._pathHandler.resolvePath(args[0]);
        await fs.unlink(filePath);
        displayResultLine(`File ${args[0]} was successfully removed`);
    }
}

export const createCommand = () => new CommandRm();