import { getPathHandler } from '../pathService.js';
import * as messages from './messages.mjs'
import { ForegroundColor } from './colors.js';

const _pathHandler = getPathHandler();
const colorConsoleLog = (message, color) => console.log(`\x1b[${color}m${message}\x1b[0m`);
export const displayGreeting = (username) => colorConsoleLog(messages.greeting(username), ForegroundColor.Green);
export const displayGoodbye = (username) => colorConsoleLog(messages.goodbye(username), ForegroundColor.Green);
export const displayCwd = () => colorConsoleLog(messages.cwd(_pathHandler.cwd), ForegroundColor.Yellow);
export const displayError = (error) => colorConsoleLog(error, ForegroundColor.Red);
export const displayResultLine = (result) => colorConsoleLog(result, ForegroundColor.Blue);
