import { CommandBase } from "../commandBase.js";
import fs from 'node:fs/promises';

class CommandAdd extends CommandBase {
    constructor() {
        super("add");
    }

    async performCommand(args) {
        const filePath = this._pathHandler.resolvePath(args[0]);
        await fs.writeFile(filePath, '', { flag: 'wx' });
    }
}
export const createCommandAdd = () => new CommandAdd();