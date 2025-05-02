import {getPathHandler} from "../pathService.js";

export class CommandBase {
    constructor(commandString) {
        this._command = commandString;
        this._pathHandler = getPathHandler();
    }

    supportsCommand(commandString) {
        return this._command === commandString;
    }

    async performCommand(args) {
    }

    validateParameters(args) {
        return true;
    }

    get usage() {
        return this._usage;
    }
}