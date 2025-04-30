import { createCommandExit } from "./commandExit.js";
import { createCommandLs } from "./commandLs.js";
import { createCommandUp } from "./commandUp.js";
import { createCommandCd } from "./commandCd.js";
import { createCommandCat } from "./commandCat.js";
import { createCommandAdd } from "./commandAdd.js";
import { createCommandMkdir } from "./commandMkdir.js";

class CommandBuilder{
    constructor() {
        this._commandList = [
            createCommandLs(), 
            createCommandExit(),
            createCommandUp(),
            createCommandCd(),
            createCommandCat(),
            createCommandAdd(),
            createCommandMkdir()
        ];
    }

    getCommand = (command) => {
        const commandString = command.split(' ')[0];
        let commandObject = this._commandList.find((commandObj) => commandObj.supportsCommand(commandString));
        return commandObject;
    }
}
export const createCommandBuilder = () => new CommandBuilder()