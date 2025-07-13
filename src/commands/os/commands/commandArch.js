import {displayResultLine} from '#MessageManager';
import {CommandBase} from '#CommandBase';
import {arch} from 'os';
import {Export} from "@duude92/lazyinject";

class CommandArch extends CommandBase {
    constructor() {
        super('--architecture');
    }

    async performCommand(argv) {
        const architecture = arch();
        displayResultLine(`CPU architecture: ${architecture}`);
    }
}

Export('OsCommandBase')(CommandArch);
