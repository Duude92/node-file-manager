import {CommandBase} from '#CommandBase';
import {STRICT_COMMANDS} from '#AppConfig';

class CommandCd extends CommandBase {
    constructor() {
        super('cd');
        this._usage = `cd [PATH]`;
        this._description = `Changes CWD to PATH`;//${EOL}If [PATH] is not provided, CWD would be changed to HOMEDIR`;
    }

    validateParameters(args) {
        // Lead to Invalid input error if cd has no parameters
        return args.length > 0;
    };

    async performCommand(args) {
        if (STRICT_COMMANDS && args.length === 0) {
            await this._pathHandler.cd(this._pathHandler.homePath);
            return;
        }
        const path = args[0];
        await this._pathHandler.cd(path);
    }
}

export const createCommand = () => new CommandCd();