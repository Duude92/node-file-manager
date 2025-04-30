import * as fscommands from './fs/fs.js'
import { createCommandExit } from "./commandExit.js";

class CommandBuilder{
    constructor() {
        this._commandList = [
            createCommandExit(),
            fscommands.createCommandLs(), 
            fscommands.createCommandUp(),
            fscommands.createCommandCd(),
            fscommands.createCommandCat(),
            fscommands.createCommandAdd(),
            fscommands.createCommandMkdir()
        ];
    }

    getCommand = (command) => {
        const commandString = command.split(' ')[0];
        let commandObject = this._commandList.find((commandObj) => commandObj.supportsCommand(commandString));
        return commandObject;
    }
}
export const createCommandBuilder = () => new CommandBuilder()