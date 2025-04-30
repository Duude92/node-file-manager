import process from 'node:process'
import * as messageManager from './messages/messageManager.mjs';
import fs from 'node:fs';
// I've added verification if the username is provided in the command line arguments, if not it will use 'Anonymous' as default.
const username = process.argv[2] && process.argv[2].split('=')[1] || 'Anonymous';
messageManager.displayGreeting(username);