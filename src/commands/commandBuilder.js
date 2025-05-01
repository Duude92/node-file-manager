import { fsCommands } from './fs/fs.js'
import { createCommandExit } from "./commandExit.js";
import { utilities } from './utilities/utilities.js';

class CommandBuilder {
    constructor() {
        this._commandList = [
            createCommandExit(),
            ...fsCommands,
            ...utilities
        ];
    }

    getCommand = (command) => {
        const commandString = command.split(' ')[0];
        let commandObject = this._commandList.find((commandObj) => commandObj.supportsCommand(commandString));
        return commandObject;
    }
}
export const createCommandBuilder = () => new CommandBuilder()