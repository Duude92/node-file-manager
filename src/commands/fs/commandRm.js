import { CommandBase } from "../commandBase.js";
import fs from 'node:fs/promises';

class CommandRm extends CommandBase {
    constructor() {
        super('rm');
    }

    async performCommand(args) {
        const filePath = this._pathHandler.resolvePath(args[0]);
        await fs.unlink(filePath);
    }
}
export const createCommandRm = () => new CommandRm();