import { CommandBase } from "../commandBase.js";
import fs from 'node:fs/promises';

class CommandMv extends CommandBase {
    constructor() {
        super("mv");
    }
    //FIXME: add check if destination path exists
    async performCommand(args) {
        if (args.length < 2) {
            throw new Error("Not enough arguments. Usage: mv <source> <destination>");
        }
        const sourcePath = this._pathHandler.resolvePath(args[0]);
        const destinationPath = this._pathHandler.resolvePath(args[1]);
        await fs.rename(sourcePath, destinationPath);
    }
}
export const createCommandMv = () => new CommandMv();