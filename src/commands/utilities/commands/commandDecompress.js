import { CommandBase } from "../../commandBase.js";
import { createGunzip } from "node:zlib"
import { createReadStream, createWriteStream } from "node:fs";
import { displayResultLine } from "../../../messages/messageManager.mjs";
import { pipeline } from 'node:stream/promises';

class CommandDecompress extends CommandBase {
    constructor() {
        super("decompress");
    }

    async performCommand(args) {
        if (args.length < 2) {
            throw new Error("Invalid number of arguments. Usage: compress <source> <destination>");
        }
        const sourcePath = this._pathHandler.resolvePath(args[0]);
        const destinationPath = this._pathHandler.resolvePath(args[1]);
        const sourceFile = createReadStream(sourcePath);
        const destinationFile = createWriteStream(destinationPath);
        const gzip = createGunzip();
        await pipeline(sourceFile, gzip, destinationFile);
        displayResultLine(`${sourceFile} decompressed successfully into ${destinationPath}`);
    }
}
export const createCommand = () => new CommandDecompress();
