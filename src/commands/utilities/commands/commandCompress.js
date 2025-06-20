import {CommandBase} from '#CommandBase';
import {createBrotliCompress} from 'node:zlib'
import {createReadStream, createWriteStream} from 'node:fs';
import {displayResultLine} from '#MessageManager';
import {pipeline} from 'node:stream/promises';
import fs from "node:fs/promises";
import fsPromise from "node:fs/promises";

class CommandCompress extends CommandBase {
    constructor() {
        super("compress");
        this._usage = `compress [FILENAME] [ARCHIVENAME]`;
        this._description = `Archives FILENAME into ARCHIVENAME`;
    }

    validateParameters(args) {
        return args.length > 1;
    }

    async performCommand(args) {
        const sourcePath = this._pathHandler.resolvePath(args[0]);
        let destinationPath = this._pathHandler.resolvePath(args[1]);
        if (this._pathHandler.validateDirectoryName(args[1])) {
            // Empty catch if directory already exist
            await fs.mkdir(destinationPath, {recursive: false}).catch(() => {});
            destinationPath = this._pathHandler.join(destinationPath, args[0] + '.br');
        }
        // Should've separate repeated logic (compress/decompress)
        await fsPromise.access(sourcePath, fsPromise.constants.R_OK);
        const sourceFile = createReadStream(sourcePath);
        const destinationFile = createWriteStream(destinationPath);
        const brotli = createBrotliCompress();
        await pipeline(sourceFile, brotli, destinationFile);
        displayResultLine(`${sourcePath} compressed successfully into ${destinationPath}`);
    }
}

export const createCommand = () => new CommandCompress();