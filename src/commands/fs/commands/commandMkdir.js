import {CommandBase} from '#CommandBase';
import fs from 'node:fs/promises';

class CommandMkdir extends CommandBase {
    constructor() {
        super("mkdir");
        this._usage = `mkdir [PATH]`;
        this._description = `Create new directory in current working directory.`;
    }

    validateParameters(args) {
        return args.length > 0 && this._pathHandler.validateDirectoryName(args[0]);
    }

    async performCommand(args) {
        const dirPath = this._pathHandler.resolvePath(args[0]);
        // TODO: Ask rsschool if it is necessary to create directory recursively
        await fs.mkdir(dirPath, {recursive: false})
            .then(() => console.log(`Directory created: ${dirPath}`));
    }
}

export const createCommand = () => new CommandMkdir();