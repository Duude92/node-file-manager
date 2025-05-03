import { displayResultLine } from '#MessageManager';
import { CommandBase } from '#CommandBase';
import { EOL } from 'node:os';

class CommandEol extends CommandBase {
    constructor() {
        super('--EOL');
    }

    async performCommand(argv) {
        displayResultLine(`End of line character: ${JSON.stringify(EOL)}`);
    }
}
export const createCommand = () => new CommandEol();