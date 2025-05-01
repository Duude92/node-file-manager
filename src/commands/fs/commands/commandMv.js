import { CommandBase } from "../../commandBase.js";
import fsPromise from 'node:fs/promises';
import fs from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { displayResultLine } from "../../../messages/messageManager.mjs";

class CommandMv extends CommandBase {
    constructor() {
        super("mv");
    }
    //FIXME: add check if destination path exists
    async performCommand(args) {
        if (args.length < 2) {
            throw new Error("Not enough arguments. Usage: mv <source> <destination>");
        }
        const sourcePath = this._pathHandler.resolvePath(args[0]);
        const destinationPath = this._pathHandler.resolvePath(args[1]);
        await fsPromise.access(sourcePath, fsPromise.constants.R_OK);
        const sourceStream = fs.createReadStream(sourcePath);
        const destinationStream = fs.createWriteStream(destinationPath, { flags: 'wx' });
        await pipeline(sourceStream, destinationStream);
        await fsPromise.unlink(this._pathHandler.resolvePath(sourcePath));
        displayResultLine(`${sourcePath} successfully moved to ${destinationPath}`);
    }
}
export const createCommand = () => new CommandMv();