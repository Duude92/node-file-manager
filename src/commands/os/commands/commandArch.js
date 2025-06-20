import { displayResultLine } from '#MessageManager';
import { CommandBase } from '#CommandBase';
import { arch } from 'os';

class CommandArch extends CommandBase{
    constructor() {
        super('--architecture');
    }
    async performCommand(argv) {
        const architecture = arch();
        displayResultLine(`CPU architecture: ${architecture}`);
    }
}
export const createCommand = () => new CommandArch();