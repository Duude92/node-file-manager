import {displayError} from "../../messages/messageManager.mjs";
import {CommandBase} from "../commandBase.js";
import {getCommands} from "../commandLoader.js";
import {EOL} from "node:os";

const usage = `Usage: os [option]
Options:
    --EOL               Display the end of line character used by the operating system.
    --cpus              Display the number of CPUs.
    --homedir           Display the home directory of the current user.
    --username          Display the username of the current user.
    --architecture      Display the architecture of the operating system.`;

const parameters = await getCommands('./os/');

class CommandOs extends CommandBase {
    constructor() {
        super('os');
        this._parameters = parameters;
    }

    async performCommand(args) {
        if (args.length === 0) {
            displayError(`Error: No arguments provided for os command.${EOL}${usage}`);
            return;
        }
        const command = await this.getCommand(args[0]);
        try {
            command.performCommand();
        } catch (error) {
            throw new Error(`Invalid parameter: ${args[0]}${EOL}${usage}`);
        }
    }

    getCommand = async (command) => {
        const commandString = command.split(' ')[0];
        let commandObject = this._parameters.find((commandObj) => commandObj.supportsCommand(commandString));
        return commandObject;
    }
}

export const createCommandOs = () => new CommandOs();