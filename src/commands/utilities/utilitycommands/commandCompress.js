import { CommandBase } from "../../commandBase.js";
import { createGzip } from "node:zlib"
import { createReadStream, createWriteStream } from "node:fs";
import { displayResultLine } from "../../../messages/messageManager.mjs";
import { pipeline } from 'node:stream/promises';

class CommandCompress extends CommandBase {
    constructor() {
        super("compress");
    }

    async performCommand(cwd, args) {
        if (args.length < 2) {
            throw new Error("Invalid number of arguments. Usage: compress <source> <destination>");
        }
        const sourcePath = this._pathHandler.resolvePath(args[0]);
        const destinationPath = this._pathHandler.resolvePath(args[1]);
        const sourceFile = createReadStream(sourcePath);
        const destinationFile = createWriteStream(destinationPath);
        const gzip = createGzip();
        await pipeline(sourceFile, gzip, destinationFile);
        displayResultLine(`${sourcePath} compressed successfully into ${destinationPath}`);
    }
}
export const createCommandCompress = () => new CommandCompress();