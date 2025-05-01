import fs from 'node:fs';
import path from 'node:path';

const commandsDirectory = './commands/';
export class CommandLoader {
    constructor(basePath) {
        this._commands = [];
        const localCommandsDirectory = path.resolve('./src/commands/' + basePath, commandsDirectory);
        const files = fs.readdirSync(localCommandsDirectory);

        this._commands = Promise.all(files.map(async file => {
            const filePath = basePath + commandsDirectory + file;
            let module = await import(filePath);
            let command = module.createCommand();
            return command;
        }));
    }
    get commands() { return this._commands; }
}