import { Transform } from 'node:stream';
import { createCommandBuilder } from './commandBuilder.js';
import os from 'node:os';
import { getPathHandler } from '../pathHandler.js';
const commandBuilder = createCommandBuilder();
const pathHandler = getPathHandler();
const transformStream = new Transform({
    transform(chunk, encoding, callback) {
        try {
            const command = commandBuilder.getCommand(chunk.toString().trim());
            const args = chunk.toString().trim().split(' ').slice(1);
            command.performCommand(pathHandler.cwd, args).then((result) => {
                try {
                    let newResult = result.join('\n') + os.EOL + '> ';
                    this.push(newResult);
                    callback();
                }
                catch (error) {
                    this.push(`Command result error: ${error.message}` + os.EOL + '> ');
                    callback();
                }
            });
        }
        catch (error) {
            this.push(`Command error: ${error.message}` + os.EOL + '> ');
            callback();
        }

    }
});
export const createTransformStream = () => transformStream;