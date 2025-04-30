import { CommandBase } from "./commandBase.js";
import fs from 'node:fs/promises';

class CommandMkdir extends CommandBase {
    constructor() {
        super("mkdir");
    }

    async performCommand(cwd, args) {
        const dirPath = this._pathHandler.resolvePath(args[0]);
        // TODO: Ask rsschool if it is necessary to create directory recursively
        await fs.mkdir(dirPath, { recursive: false })
            .then(() => console.log(`Directory created: ${dirPath}`));
    }
}
export const createCommandMkdir = () => new CommandMkdir();