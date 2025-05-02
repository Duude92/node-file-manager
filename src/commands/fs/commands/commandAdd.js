import { CommandBase } from "../../commandBase.js";
import fs from 'node:fs/promises';
import {displayResultLine} from "../../../messages/messageManager.mjs";

class CommandAdd extends CommandBase {
    constructor() {
        super("add");
    }

    async performCommand(args) {
        const filePath = this._pathHandler.resolvePath(args[0]);
        await fs.writeFile(filePath, '', { flag: 'wx' });
        displayResultLine(`File ${filePath} successfully created`);
    }
}
export const createCommand = () => new CommandAdd();