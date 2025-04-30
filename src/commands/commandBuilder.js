import { createCommandExit } from "./commandExit.js";
import { createCommandLs } from "./commandLs.js";

class CommandBuilder{
    constructor() {
        this._commandList = [
            createCommandLs(), 
            createCommandExit()
        ];
    }

    getCommand = (command) => {
        const commandString = command.split(' ')[0];
        let commandObject = this._commandList.find((commandObj) => commandObj.supportsCommand(commandString));
        return commandObject;
    }
}
export const createCommandBuilder = () => new CommandBuilder()