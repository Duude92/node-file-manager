import fs from "node:fs";
import { CommandBase } from "../../commandBase.js";
import { pipeline } from "node:stream/promises";
import { displayResultLine } from "../../../messages/messageManager.mjs";
import fsPromise from "node:fs/promises";

class CommandCp extends CommandBase {
    constructor() {
        super("cp");
    }
    async performCommand(args) {
        if (args.length < 2) {
            throw new Error("Not enough arguments. Usage: cp <source> <destination>");
        }
        const sourcePath = this._pathHandler.resolvePath(args[0]);
        const destinationPath = this._pathHandler.resolvePath(args[1]);
        // Test if sourcePath is accessible to read
        await fsPromise.access(sourcePath, fsPromise.constants.R_OK);
        if (!(await fsPromise.lstat(sourcePath)).isFile()) {
            await fsPromise.cp(sourcePath, destinationPath, { recursive: true });
            displayResultLine(`Directory content ${sourcePath} successfully copied to ${destinationPath}`);
            return;
        }
        const sourceStream = fs.createReadStream(sourcePath);
        const destinationStream = fs.createWriteStream(destinationPath, { flags: 'wx' });
        await pipeline(sourceStream, destinationStream);
        displayResultLine(`${sourcePath} successfully copied to ${destinationPath}`);
    }
}
export const createCommand = () => new CommandCp();