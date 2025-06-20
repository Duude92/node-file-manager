import {CommandBase} from '#CommandBase';

class CommandUp extends CommandBase {
    constructor() {
        super('up');
        this._usage = `up`;
        this._description = `Go upper from current directory.`;
    }

    validateParameters = (args) => true;

    async performCommand(args) {
        await this._pathHandler.cd('..');
    }
}

export const createCommand = () => new CommandUp();