import { CommandLoader } from "../commandLoader.js";

const loader = new CommandLoader("./utilities/");
const utilities = await loader.commands;
export { utilities };