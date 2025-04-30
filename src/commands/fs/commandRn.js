import { CommandBase } from "../commandBase.js";
import fs from 'node:fs/promises';

class CommandRn extends CommandBase{
    constructor() {
        super('rn');
    }
    // TODO: test if newpath already exist
    async performCommand(cwd, args) {
        if (args.length < 2) {
            throw new Error('Not enough arguments. Usage: rn <oldname> <newname>');
        }
        const oldPath = this._pathHandler.resolvePath(args[0]);
        const newPath = this._pathHandler.resolvePath(args[1]);
        await fs.rename(oldPath, newPath);
    }
}
export const createCommandRn = () => new CommandRn();