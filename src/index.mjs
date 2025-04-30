import process from 'node:process'
import * as messageManager from './messages/messageManager.mjs';
import { pipeline } from 'node:stream/promises';
import { createTransformStream } from './commands/commandTransform.js';
import { getPathHandler } from './pathHandler.js';
import os from 'node:os';
// I've added verification if the username is provided in the command line arguments, if not it will use 'Anonymous' as default.
const username = process.argv[2] && process.argv[2].split('=')[1] || 'Anonymous';
const pathHandler = getPathHandler();
messageManager.setUsername(username);
messageManager.displayGreeting();
messageManager.displayCwd();
process.stdout.write('> ');
process.on('SIGINT', () => {
    process.stdout.write(os.EOL);
    messageManager.displayGoodbye();
    process.exit(0);
});
await pipeline(process.stdin, createTransformStream(), process.stdout, { end: false });