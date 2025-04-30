import { Transform } from 'node:stream';
import { createCommandBuilder } from './commandBuilder.js';
import os from 'node:os';
import { getPathHandler } from '../pathHandler.js';
import { displayCwd } from '../messages/messageManager.mjs';
const commandBuilder = createCommandBuilder();
const pathHandler = getPathHandler();
const transformStream = new Transform({
    transform(chunk, encoding, callback) {
        const input = chunk.toString().trim();
        const displayResult = (result) => {
            displayCwd();

            this.push(`${result}${os.EOL}> `);
            callback();
        }
        try {
            const command = commandBuilder.getCommand(input);
            const args = input.split(' ').slice(1);
            command.performCommand(pathHandler.cwd, args).then((result) => {
                try {
                    displayResult('');
                }
                catch (error) {
                    displayResult(`Operation failed:\n ${error}`);
                }
            });
        }
        catch (error) {
            displayResult(`Invalid input: ${input}`);
        }
    }
});
export const createTransformStream = () => transformStream;