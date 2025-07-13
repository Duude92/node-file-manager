import {displayResultLine} from '#MessageManager';
import {CommandBase} from '#CommandBase';
import {EOL} from 'node:os';
import {Export} from "@duude92/lazyinject";

class CommandEol extends CommandBase {
    constructor() {
        super('--EOL');
    }

    async performCommand(argv) {
        displayResultLine(`End of line character: ${JSON.stringify(EOL)}`);
    }
}

Export('OsCommandBase')(CommandEol);
