import {CommandBase} from '#CommandBase';
import fs from 'node:fs/promises';
import crypto from 'node:crypto';
import {displayResultLine} from '#MessageManager';

class CommandHash extends CommandBase {
    constructor() {
        super("hash");
        this._usage = `hash [FILENAME]`;
        this._description = `Calculates sha256 algorithm hash for FILENAME.`;
    }

    validateParameters(args) {
        return args.length > 0;
    }

    async performCommand(args) {
        const filePath = this._pathHandler.resolvePath(args[0]);
        const fileContent = await fs.readFile(filePath, {encoding: "utf-8"});
        const hash = crypto.createHash("sha256").update(fileContent).digest("hex");
        displayResultLine(`Hash of ${filePath}: ${hash}`);
    }
}

export const createCommand = () => new CommandHash();