import { CommandBase } from "./commandBase.js";
import * as messageManager from '../messages/messageManager.mjs';
// Include both 'exit' and '.exit' as valid commands
const regexp = /^\.?exit$/;

class CommandExit extends CommandBase {
    constructor() {
        super('exit');
        this._regexp = new RegExp(regexp);
    }
    supportsCommand(commandstring){
        return this._regexp.test(commandstring);
    }
    async performCommand(cwd, args) {
        messageManager.displayGoodbye();
        process.exit(0);
    }
}
export const createCommandExit = () => new CommandExit();