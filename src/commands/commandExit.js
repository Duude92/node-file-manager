import { CommandBase } from "./commandBase.js";
import * as messageManager from '../messages/messageManager.mjs';
import { getUserHandler } from "../userHandler.js";
import { STRICT_EXIT } from "../appconfig.js";
// Include both 'exit' and '.exit' as valid commands
const regexp = STRICT_EXIT ? /^\.exit$/ : /^\.?exit$/;
class CommandExit extends CommandBase {
    constructor() {
        super('exit');
        this._regexp = new RegExp(regexp);
    }
    supportsCommand(commandstring) {
        return this._regexp.test(commandstring);
    }
    async performCommand(args) {
        getUserHandler().goodbye();
        process.exit(0);
    }
}
export const createCommandExit = () => new CommandExit();