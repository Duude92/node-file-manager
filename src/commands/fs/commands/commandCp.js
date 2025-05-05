import fs from 'node:fs';
import {CommandBase} from '#CommandBase';
import {pipeline} from 'node:stream/promises';
import {displayResultLine} from '#MessageManager';
import fsPromise from 'node:fs/promises';
import path from "node:path";

class CommandCp extends CommandBase {
    constructor() {
        super("cp");
        this._usage = `cp [FILE1] [FILE2]`;
        this._description = `Copies FILE1 into FILE2`;
    }

    validateParameters(args) {
        return args.length > 1;
    }

    async performCommand(args) {
        const sourcePath = this._pathHandler.resolvePath(args[0]);
        let destinationPath = this._pathHandler.resolvePath(args[1]);
        // Test if sourcePath is accessible to read
        await fsPromise.access(sourcePath, fsPromise.constants.R_OK);
        if (!(await fsPromise.lstat(sourcePath)).isFile()) {
            await fsPromise.cp(sourcePath, destinationPath, {recursive: true});
            displayResultLine(`Directory content ${sourcePath} successfully copied to ${destinationPath}`);
            return;
        }
        if (this._pathHandler.validateDirectoryName(args[1])) {
            const file = path.parse(sourcePath);
            destinationPath = this._pathHandler.join(destinationPath, file.base);
        }
        const sourceStream = fs.createReadStream(sourcePath);
        const destinationStream = fs.createWriteStream(destinationPath, {flags: 'wx'});
        await pipeline(sourceStream, destinationStream);
        displayResultLine(`${sourcePath} successfully copied to ${destinationPath}`);
    }
}

export const createCommand = () => new CommandCp();