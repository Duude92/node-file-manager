import { CommandBase } from "../commandBase.js";
import fs from 'node:fs/promises';
const encoding = 'utf8';

class CommandCat extends CommandBase {
    constructor() {
        super("cat");
    }

    async performCommand(args) {
        try {
            const filePath = this._pathHandler.resolvePath(args[0]);
            console.log(await fs.readFile(filePath, encoding));
        }
        catch (error) {
            throw error;
        }
    }
}
export const createCommandCat = () => new CommandCat();