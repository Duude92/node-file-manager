import {CommandBase} from '#CommandBase';
import fs from 'node:fs/promises';
import {displayResultLine} from '#MessageManager';

class CommandAdd extends CommandBase {
    constructor() {
        super("add");
        this._usage = `add [FILE]`;
        this._description = 'Creates empty file with name [FILE]';
    }

    validateParameters(args) {
        return args.length > 0;
    }

    async performCommand(args) {
        const filePath = this._pathHandler.resolvePath(args[0]);
        await fs.writeFile(filePath, '', {flag: 'wx'});
        displayResultLine(`File ${filePath} successfully created`);
    }
}

export const createCommand = () => new CommandAdd();