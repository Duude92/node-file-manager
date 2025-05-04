import {CommandBase} from '#CommandBase';
import {createBrotliDecompress} from 'node:zlib'
import {createReadStream, createWriteStream} from 'node:fs';
import {displayResultLine} from '#MessageManager';
import {pipeline} from 'node:stream/promises';
import fs from "node:fs/promises";
import path from "node:path";

class CommandDecompress extends CommandBase {
    constructor() {
        super("decompress");
        this._usage = `decompress [FILENAME] [ARCHIVENAME]`;
        this._description = `Unpack ARCHIVENAME into FILENAME`;
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
            const src = path.parse(sourcePath);
            destinationPath = this._pathHandler.join(destinationPath, src.name);
        }
        const sourceFile = createReadStream(sourcePath);
        const destinationFile = createWriteStream(destinationPath);
        const brotli = createBrotliDecompress();
        await pipeline(sourceFile, brotli, destinationFile);
        displayResultLine(`${sourcePath} decompressed successfully into ${destinationPath}`);
    }
}

export const createCommand = () => new CommandDecompress();