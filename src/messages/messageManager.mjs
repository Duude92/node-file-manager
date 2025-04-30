import * as messages from './messages.mjs'
export const displayGreeting = (username) => console.log(messages.greeting(username));
export const displayGoodbye = (username) => console.log(messages.goodbye(username));
export const displayCwd = (directory) => console.log(messages.cwd(directory));