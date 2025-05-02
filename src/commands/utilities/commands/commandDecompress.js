import {CommandBase} from "../../commandBase.js";
import {createBrotliDecompress} from "node:zlib"
import {createReadStream, createWriteStream} from "node:fs";
import {displayResultLine} from "../../../messages/messageManager.mjs";
import {pipeline} from 'node:stream/promises';

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
        const destinationPath = this._pathHandler.resolvePath(args[1]);
        const sourceFile = createReadStream(sourcePath);
        const destinationFile = createWriteStream(destinationPath);
        const brotli = createBrotliDecompress();
        await pipeline(sourceFile, brotli, destinationFile);
        displayResultLine(`${sourcePath} decompressed successfully into ${destinationPath}`);
    }
}

export const createCommand = () => new CommandDecompress();