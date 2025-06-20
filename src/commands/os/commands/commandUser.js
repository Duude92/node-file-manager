import {displayResultLine} from '#MessageManager';
import {CommandBase} from '#CommandBase';
import os from 'node:os';

class CommandUser extends CommandBase {
    constructor() {
        super('--username');
    }

    async performCommand(argv) {
        displayResultLine(`Current user: ${os.userInfo().username}`);
    }
}

export const createCommand = () => new CommandUser();