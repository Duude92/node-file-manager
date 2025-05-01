import { getPathHandler } from "../../../pathHandler.js";
import { CommandBase } from "../../commandBase.js";

class CommandUp extends CommandBase {
    constructor() {
        super('up');
        this._pathHandler = getPathHandler();
    }
    async performCommand(args) {
        this._pathHandler.cd('..');
    }
}
export const createCommand = () => new CommandUp();