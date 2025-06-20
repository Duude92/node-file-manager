import { getCommands } from '../commandLoader.js';


const fsCommands = await getCommands("./fs/");
export { fsCommands }