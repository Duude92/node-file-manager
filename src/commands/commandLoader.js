import fs from 'node:fs';
import path from 'node:path';

const commandsDirectory = './commands/';
/**
 * Dynamically load modules from 'commands' directory
 * @param basePath Base directory of current module, which contains 'commands' directory with command modules
 * @returns {Promise<Awaited<CommandBase[]>>} Awaited array of commands
 */
export const getCommands = async (basePath) => {
    const localCommandsDirectory = path.resolve('./src/commands/' + basePath, commandsDirectory);
    const files = fs.readdirSync(localCommandsDirectory);

    return Promise.all(files.map(async file => {
        const filePath = basePath + commandsDirectory + file;
        let module = await import(filePath);
        /** @type {CommandBase}*/
        let command = module.createCommand();
        return command;
    }));
}
