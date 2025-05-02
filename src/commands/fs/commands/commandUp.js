import {getPathHandler} from "../../../pathService.js";
import {CommandBase} from "../../commandBase.js";

class CommandUp extends CommandBase {
    constructor() {
        super('up');
        this._pathHandler = getPathHandler();
        this._usage = `up`;
        this._description = `Go upper from current directory.`;
    }

    validateParameters = (args) => true;

    async performCommand(args) {
        await this._pathHandler.cd('..');
    }
}

export const createCommand = () => new CommandUp();