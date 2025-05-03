import { displayResultLine } from '#MessageManager';
import { CommandBase } from '#CommandBase';

class CommandHome extends CommandBase {
    constructor() {
        super('--homedir');
    }
    async performCommand(argv) {
        const homeDir = this._pathHandler.homePath;
        displayResultLine(`Home Directory: ${homeDir}`);
    }
}
export const createCommand = () => new CommandHome();