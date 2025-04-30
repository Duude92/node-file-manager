import process from 'node:process'
import * as messageManager from './messages/messageManager.mjs';
import { pipeline } from 'node:stream/promises';
import { createPathHandler } from './pathHandler.js';
import { createTransformStream } from './commands/commandTransform.js';
// I've added verification if the username is provided in the command line arguments, if not it will use 'Anonymous' as default.
const username = process.argv[2] && process.argv[2].split('=')[1] || 'Anonymous';
messageManager.displayGreeting(username);
const pathHandler = createPathHandler();
messageManager.displayCwd(pathHandler.cwd);

await pipeline(process.stdin, createTransformStream(), process.stdout, { end: false });

messageManager.displayGoodbye(username);