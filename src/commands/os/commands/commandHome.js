import { displayResultLine } from "../../../messages/messageManager.mjs";
import { CommandBase } from "../../commandBase.js";

class CommandHome extends CommandBase {
    constructor() {
        super('--homedir');
    }
    async performCommand(argv) {
        const homeDir = this._pathHandler.homepath;
        displayResultLine(`Home Directory: ${homeDir}`);
    }
}
export const createCommand = () => new CommandHome();