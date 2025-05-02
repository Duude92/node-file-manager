import {fsCommands} from './fs/fs.js'
import {createCommandExit} from "./commandExit.js";
import {utilities} from './utilities/utilities.js';
import {createCommandOs} from './os/os.js';

class CommandBuilder {
    constructor() {
        /**
         * @type {CommandBase[]}
         * @private
         */
        this._commandList = [
            createCommandExit(),
            ...fsCommands,
            ...utilities,
            createCommandOs(),
        ];
    }

    /**
     * @param command string command
     * @returns {CommandBase} object
     */
    getCommand = (command) => {
        const commandString = command.split(' ')[0];
        return this._commandList.find((commandObj) => commandObj.supportsCommand(commandString));
    }
}
export const createCommandBuilder = () => new CommandBuilder()