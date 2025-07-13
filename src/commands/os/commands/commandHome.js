import {displayResultLine} from '#MessageManager';
import {CommandBase} from '#CommandBase';
import {Export} from "@duude92/lazyinject";

class CommandHome extends CommandBase {
    constructor() {
        super('--homedir');
    }

    async performCommand(argv) {
        const homeDir = this._pathHandler.homePath;
        displayResultLine(`Home Directory: ${homeDir}`);
    }
}

Export('OsCommandBase')(CommandHome);
