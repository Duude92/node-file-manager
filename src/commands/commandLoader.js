import fs from 'node:fs';
import path from 'node:path';

const commandsDirectory = './commands/';
export const getCommands = async (basePath) => {
    const localCommandsDirectory = path.resolve('./src/commands/' + basePath, commandsDirectory);
    const files = fs.readdirSync(localCommandsDirectory);

    return Promise.all(files.map(async file => {
        const filePath = basePath + commandsDirectory + file;
        let module = await import(filePath);
        let command = module.createCommand();
        return command;
    }));
}
