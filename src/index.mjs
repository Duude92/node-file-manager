import process from 'node:process'
import * as messageManager from './messages/messageManager.mjs';
import fs from 'node:fs';
const username = process.argv[2]&&process.argv[2].split('=')[1];
messageManager.displayGreeting(username);