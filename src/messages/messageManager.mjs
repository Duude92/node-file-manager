import * as messages from './messages.mjs'
let _username = '';
export const displayGreeting = () => console.log(messages.greeting(_username));
export const displayGoodbye = () => console.log(messages.goodbye(_username));
export const displayCwd = (directory) => console.log(messages.cwd(directory));
export const setUsername = (username) => _username = username;
