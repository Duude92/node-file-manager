import {CommandBase} from '#CommandBase';
import fs from 'node:fs/promises';
import {displayResultLine} from '#MessageManager';

class CommandRn extends CommandBase {
    constructor() {
        super('rn');
        this._usage = `rn [FILENAME] [NEWNAME]`;
        this._description = `Renames FILENAME to NEWNAME`;
    }

    validateParameters(args) {
        return args.length > 1;
    }

    // TODO: test if newpath already exist
    async performCommand(args) {
        const oldPath = this._pathHandler.resolvePath(args[0]);
        const newPath = this._pathHandler.resolvePath(args[1]);
        try {
            await fs.access(newPath, fs.constants.R_OK);
            const error = new Error(`${newPath} already exists`);
            error.code = 'EEXIST';
            throw error;
        } catch (e) {
            if (e.code === 'EEXIST') throw e;
            await fs.rename(oldPath, newPath);
            displayResultLine(`File ${args[0]} was renamed to ${args[1]}`);
        }
    }
}

export const createCommand = () => new CommandRn();