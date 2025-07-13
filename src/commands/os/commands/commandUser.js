import {displayResultLine} from '#MessageManager';
import {CommandBase} from '#CommandBase';
import os from 'node:os';
import {Export} from "@duude92/lazyinject";

class CommandUser extends CommandBase {
    constructor() {
        super('--username');
    }

    async performCommand(argv) {
        displayResultLine(`Current user: ${os.userInfo().username}`);
    }
}

Export('OsCommandBase')(CommandUser);
