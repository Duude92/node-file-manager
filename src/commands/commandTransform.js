import { Transform } from 'node:stream';
import { createCommandBuilder } from './commandBuilder.js';
import os from 'node:os';
import { getPathHandler } from '../pathHandler.js';
import { displayCwd, displayError } from '../messages/messageManager.mjs';
const commandBuilder = createCommandBuilder();
const transformStream = new Transform({
    transform(chunk, encoding, callback) {
        const input = chunk.toString().trim();
        const displayCommandFooter = () => {
            displayCwd();

            this.push(`${os.EOL}> `);
            callback();
        }
        try {
            const command = commandBuilder.getCommand(input);
            const args = input.split(' ').slice(1);
            command.performCommand(args).then((result) => {
                displayCommandFooter();
            }).catch((error) => {
                displayError(`Operation failed:\n ${error}`);
                displayCommandFooter();
            });
        }
        catch (error) {
            displayError(`Invalid input: ${input}`);
            displayCommandFooter();
        }
    }
});
export const createTransformStream = () => transformStream;