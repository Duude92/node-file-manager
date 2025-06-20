import {CommandBase} from '#CommandBase';
import {getFileType} from '../filetypeResolver.js';
import {STRICT_COMMANDS} from '#AppConfig';

class CommandLs extends CommandBase {
    constructor() {
        super('ls');
        this._usage = `ls`;
        this._description = `Print in console list of all files and folders in current directory.`;
    }

    validateParameters(args) {
        return args.length === 0;
    }

    async performCommand(args) {
        const dirContent = await this._pathHandler.ls(STRICT_COMMANDS ? '.' : (!!args[0]) && args[0] || this._pathHandler.cwd);
        dirContent.sort((a, b) => a.name.localeCompare(b.name))
        dirContent.sort((a, b) => a.isDirectory() && !b.isDirectory() ? -1 : 1);

        const result = dirContent.map((file) => ({Name: file.name, Type: getFileType(file)}));
        console.table(result);
        return '';
    }
}

export const createCommand = () => new CommandLs();