import process from 'node:process'
import * as messageManager from './messages/messageManager.mjs';
import { Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { createPathHandler } from './pathHandler.js';
import { transformStream as commandTransform } from './commands/commandTransform.js';
// I've added verification if the username is provided in the command line arguments, if not it will use 'Anonymous' as default.
const username = process.argv[2] && process.argv[2].split('=')[1] || 'Anonymous';
messageManager.displayGreeting(username);
const pathHandler = createPathHandler();
messageManager.displayCwd(pathHandler.cwd);


await pipeline(process.stdin, commandTransform, process.stdout, { end: false });

messageManager.displayGoodbye(username);