import { Transform } from 'node:stream';
import { createCommandBuilder } from './commandBuilder.js';
import os from 'node:os';
const commandBuilder = createCommandBuilder();
const transformStream = new Transform({
    transform(chunk, encoding, callback) {
        const command = commandBuilder.getCommand(chunk.toString().trim());
        const args = chunk.toString().trim().split(' ').slice(1);
        command.performCommand(args).then((result) => {
            result = result.join('\n') + os.EOL;
            this.push(result);
            callback();
        });
    }
});
export const createTransformStream = () => transformStream;