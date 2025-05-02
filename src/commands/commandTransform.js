import {Transform} from 'node:stream';
import {createCommandBuilder} from './commandBuilder.js';
import {EOL} from 'node:os';
import {displayCwd, displayError} from '#MessageManager';

const commandBuilder = createCommandBuilder();
const transformStream = new Transform({
    transform(chunk, encoding, callback) {
        const input = chunk.toString().trim();
        const displayCommandFooter = () => {
            displayCwd();

            this.push(`${EOL}> `);
            callback();
        }
        try {
            const command = commandBuilder.getCommand(input);
            const args = input.split(' ').slice(1);
            if (!command || !command.validateParameters(args)) {
                const error = new Error(`Invalid input: ${input}${EOL}Usage: ${command.usage}${EOL}${EOL}${command.description}`);
                error.code = 'EINVAL';
                throw error;
            }
            command.performCommand(args).then(() => {
                displayCommandFooter();
            }).catch((error) => {
                displayError(`Operation failed:${EOL}${error}`);
                displayCommandFooter();
            });
        } catch (error) {
            switch (error.code) {
                case 'EINVAL':
                    displayError(error);
                    break;
                default:
                    displayError(`Invalid input: ${input}${EOL}${error}`);
            }
            displayCommandFooter();
        }
    }
});
export const createTransformStream = () => transformStream;