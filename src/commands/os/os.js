import {CommandBase} from '#CommandBase';
import {getCommands} from '../commandLoader.js';
import {EOL} from 'node:os';

// It is possible to compile usage with parameters.map=>parameter.usage \t parameter.description
// But in my opinion, it wouldn't form such pretty usage text
const usage = `os [option]
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
        this._usage = usage;
        this._description = `Prints OS information.`;
    }

    validateParameters(args) {
        return args.length > 0;
    }

    async performCommand(args) {
        const command = await this.getCommand(args[0]);
        try {
            command.performCommand();
        } catch (error) {
            throw new Error(`Invalid parameter: ${args[0]}${EOL}${usage}`);
        }
    }

    getCommand = async (command) => {
        const commandString = command.split(' ')[0];
        return this._parameters.find((commandObj) => commandObj.supportsCommand(commandString));
    }
}

export const createCommandOs = () => new CommandOs();