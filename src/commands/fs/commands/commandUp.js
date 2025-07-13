import {CommandBase} from '#CommandBase';
import {Export} from "@duude92/lazyinject";

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

Export('FsCommandBase')(CommandUp);
