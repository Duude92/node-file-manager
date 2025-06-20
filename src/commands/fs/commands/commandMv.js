import {CommandBase} from '#CommandBase';
import fsPromise from 'node:fs/promises';
import fs from 'node:fs';
import {pipeline} from 'node:stream/promises';
import {displayResultLine} from '#MessageManager';
import path from "node:path";

class CommandMv extends CommandBase {
    constructor() {
        super("mv");
        this._usage = `mv [FILE1] [FILE2]`;
        this._description = `Move FILE1 to FILE2 path`;
    }

    validateParameters(args) {
        return args.length > 1;
    }

    //FIXME: add check if destination path exists
    async performCommand(args) {
        const sourcePath = this._pathHandler.resolvePath(args[0]);
        let destinationPath = this._pathHandler.resolvePath(args[1]);
        await fsPromise.access(sourcePath, fsPromise.constants.R_OK);
        if (this._pathHandler.validateDirectoryName(args[1])) {
            const file = path.parse(sourcePath);
            destinationPath = this._pathHandler.join(destinationPath, file.base);
        }
        const sourceStream = fs.createReadStream(sourcePath);
        const destinationStream = fs.createWriteStream(destinationPath, {flags: 'wx'});
        await pipeline(sourceStream, destinationStream);
        await fsPromise.unlink(this._pathHandler.resolvePath(sourcePath));
        displayResultLine(`${sourcePath} successfully moved to ${destinationPath}`);
    }
}

export const createCommand = () => new CommandMv();