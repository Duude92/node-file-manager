import { getPathHandler } from '../pathHandler.js';
import * as messages from './messages.mjs'
let _username = '';
const _pathHandler = getPathHandler();
export const displayGreeting = () => console.log(messages.greeting(_username));
export const displayGoodbye = () => console.log(messages.goodbye(_username));
export const displayCwd = () => console.log(messages.cwd(_pathHandler.cwd));
export const setUsername = (username) => _username = username;
