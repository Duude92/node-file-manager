import { displayResultLine } from "../../../messages/messageManager.mjs";
import { CommandBase } from "../../commandBase.js";
import { EOL } from "node:os";

class CommandEol extends CommandBase {
    constructor() {
        super('--EOL');
    }

    async performCommand(argv) {
        displayResultLine(`End of line character: ${JSON.stringify(EOL)}`);
    }
}
export const createCommand = () => new CommandEol();