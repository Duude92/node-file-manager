import {CommandBase} from "../../commandBase.js";
import fs from 'node:fs/promises';
import {displayResultLine} from "../../../messages/messageManager.mjs";

class CommandRn extends CommandBase {
    constructor() {
        super('rn');
    }

    // TODO: test if newpath already exist
    async performCommand(args) {
        if (args.length < 2) {
            throw new Error('Not enough arguments. Usage: rn <oldname> <newname>');
        }
        const oldPath = this._pathHandler.resolvePath(args[0]);
        const newPath = this._pathHandler.resolvePath(args[1]);
        await fs.rename(oldPath, newPath);
        displayResultLine(`File ${args[0]} was renamed to ${args[1]}`);
    }
}

export const createCommand = () => new CommandRn();