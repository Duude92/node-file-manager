import { CommandBase } from "./commandbase.js";
import { getPathHandler } from "../pathHandler.js";

class CommandCd extends CommandBase{
    constructor() {
        super('cd');
        this._pathHandler = getPathHandler();
    }
    async performCommand(cwd, args) {
        if (args.length === 0) {
            this._pathHandler.cd(this._pathHandler.homepath);
            return;
        }
        const path = args[0];
        this._pathHandler.cd(path);
    }
}
export const createCommandCd = () => new CommandCd();