import {CommandBase} from '#CommandBase';
import fs from 'node:fs/promises';
import {displayResultLine} from '#MessageManager';
import {STRICT_COMMANDS} from "#AppConfig";

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
        if (STRICT_COMMANDS && !this._pathHandler.validateSingleFileName(args[0])) throw new Error('Should`ve provided filename without path');
        await fs.writeFile(filePath, '', {flag: 'wx'});
        displayResultLine(`File ${filePath} successfully created`);
    }
}

export const createCommand = () => new CommandAdd();