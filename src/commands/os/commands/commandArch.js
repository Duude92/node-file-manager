import { displayResultLine } from "../../../messages/messageManager.mjs";
import { CommandBase } from "../../commandBase.js";
import { arch } from "os";

class CommandArch extends CommandBase{
    constructor() {
        super('--architecture');
    }
    async performCommand(argv) {
        const architecture = arch();
        displayResultLine(`CPU architecture: ${architecture}`);
    }
}
export const createCommand = () => new CommandArch();