import { getPathHandler } from "../pathService.js";

export class CommandBase {
    constructor(commandstring){
        this._command = commandstring;
        this._pathHandler = getPathHandler();
    }
    supportsCommand(commandstring){
        return this._command === commandstring;
    }
    async performCommand(args){}
}