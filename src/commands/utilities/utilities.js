import { getCommands } from '../commandLoader.js';

const utilities = await getCommands("./utilities/");
export { utilities };