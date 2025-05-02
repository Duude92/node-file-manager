import {displayResultLine} from "../../../messages/messageManager.mjs";
import {CommandBase} from "../../commandBase.js";
import os from "node:os";

class CommandUser extends CommandBase {
    constructor() {
        super('--username');
    }

    async performCommand(argv) {
        displayResultLine(`Current user: ${os.userInfo().username}`);
    }
}

export const createCommand = () => new CommandUser();