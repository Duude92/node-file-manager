import {getPathHandler} from "../../../pathService.js";
import {CommandBase} from "../../commandBase.js";
import {EOL} from "node:os";

class CommandCd extends CommandBase {
    constructor() {
        super('cd');
        this._pathHandler = getPathHandler();
        this._usage = `cd [PATH?]`;
        this._description = `Changes CWD to PATH.${EOL}If [PATH] is not provided, CWD would be changed to HOMEDIR`;
    }

    validateParameters = (args) => true;

    async performCommand(args) {
        if (args.length === 0) {
            await this._pathHandler.cd(this._pathHandler.homePath);
            return;
        }
        const path = args[0];
        await this._pathHandler.cd(path);
    }
}

export const createCommand = () => new CommandCd();