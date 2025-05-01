import fs from 'node:fs/promises';
import { CommandBase } from '../../commandBase.js';
import { getFileType } from '../filetypeResolver.js';
class CommandLs extends CommandBase {
    constructor() {
        super('ls');
    }
    async performCommand(args) {
        const dirContent = await this._pathHandler.ls((!!args[0]) && args[0] || this._pathHandler.cwd);
        await dirContent.sort((a, b) => a.name.localeCompare(b.name))
        await dirContent.sort((a, b) => a.isDirectory() && !b.isDirectory() ? -1 : 1);

        const result = dirContent.map((file) => ({ Name: file.name, Type: getFileType(file) }));
        console.table(result);
        return '';
    }
}
export const createCommand = () => new CommandLs();