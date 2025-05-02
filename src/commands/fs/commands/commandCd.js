import { getPathHandler } from "../../../pathHandler.js";
import { CommandBase } from "../../commandBase.js";

class CommandCd extends CommandBase {
    constructor() {
        super('cd');
        this._pathHandler = getPathHandler();
    }
    async performCommand(args) {
        if (args.length === 0) {
            await this._pathHandler.cd(this._pathHandler.homepath);
            return;
        }
        const path = args[0];
        await this._pathHandler.cd(path);
    }
}
export const createCommand = () => new CommandCd();