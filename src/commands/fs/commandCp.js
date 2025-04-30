import { CommandBase } from "../commandBase.js";
import fs from 'node:fs/promises';

class CommandCp extends CommandBase {
    constructor() {
        super("cp");
    }
    //TODO: Test for existing newpath, EXCLUSEIVE flag should be enough
    async performCommand(cwd, args) {
        if (args.length < 2) {
            throw new Error("Not enough arguments. Usage: cp <source> <destination>");
        }
        const sourcePath = this._pathHandler.resolvePath(args[0]);
        const destinationPath = this._pathHandler.resolvePath(args[1]);
        await fs.copyFile(sourcePath, destinationPath, fs.constants.COPYFILE_EXCL);
    }
}
export const createCommandCp = () => new CommandCp();