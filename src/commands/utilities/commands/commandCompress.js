import { CommandBase } from "../../commandBase.js";
import { createBrotliCompress } from "node:zlib"
import { createReadStream, createWriteStream } from "node:fs";
import { displayResultLine } from "../../../messages/messageManager.mjs";
import { pipeline } from 'node:stream/promises';

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
        const destinationPath = this._pathHandler.resolvePath(args[1]);
        const sourceFile = createReadStream(sourcePath);
        const destinationFile = createWriteStream(destinationPath);
        const brotli = createBrotliCompress();
        await pipeline(sourceFile, brotli, destinationFile);
        displayResultLine(`${sourcePath} compressed successfully into ${destinationPath}`);
    }
}
export const createCommand = () => new CommandCompress();