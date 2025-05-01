import { displayResultLine } from "../../../messages/messageManager.mjs";
import { CommandBase } from "../../commandBase.js";
import { getUserHandler } from "../../../userHandler.js";

class CommandUser extends CommandBase {
    constructor() {
        super('--username');
    }
    async performCommand(argv) {
        displayResultLine(`Current user: ${getUserHandler().username}`);
    }
}
export const createCommand = () => new CommandUser();