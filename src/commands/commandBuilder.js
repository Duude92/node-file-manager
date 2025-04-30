import { createCommandExit } from "./commandExit.js";
import { createCommandLs } from "./commandLs.js";
import { createCommandUp } from "./commandUp.js";

class CommandBuilder{
    constructor() {
        this._commandList = [
            createCommandLs(), 
            createCommandExit(),
            createCommandUp()
        ];
    }

    getCommand = (command) => {
        const commandString = command.split(' ')[0];
        let commandObject = this._commandList.find((commandObj) => commandObj.supportsCommand(commandString));
        return commandObject;
    }
}
export const createCommandBuilder = () => new CommandBuilder()