import process from 'node:process'
import * as messageManager from './messages/messageManager.mjs';
import { pipeline } from 'node:stream/promises';
import { createTransformStream } from './commands/commandTransform.js';
import os from 'node:os';
import { getUserHandler } from './userHandler.js';
const DOUBLE_HYPHEN_ONLY = true;
// I've added verification if the username is provided in the command line arguments, if not it will use 'Anonymous' as default.
const getUsername = () => {
    // Fix powershell npm processing arguments with double hyphen
    // See the https://discord.com/channels/755676888680366081/1366674843852079124/1367447759812300831
    if (!!process.env.npm_config_username) return process.env.npm_config_username;
    const arg = process.argv.find(arg => arg.includes(`${DOUBLE_HYPHEN_ONLY ? '--' : ''}username`));
    return arg && arg.split('=')[1]
        || 'Anonymous';
}
let userhandler = getUserHandler();
userhandler.username = getUsername();
userhandler.greet();
messageManager.displayCwd();
process.stdout.write('> ');
process.on('SIGINT', () => {
    process.stdout.write(os.EOL);
    userhandler.goodbye();
    process.exit(0);
});
await pipeline(process.stdin, createTransformStream(), process.stdout, { end: false }); 