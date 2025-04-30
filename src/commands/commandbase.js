export class CommandBase {
    constructor(commandstring){
        this._command = commandstring;
    }
    supportsCommand(commandstring){
        return this._command === commandstring;
    }
    async performCommand(cwd, args){}

}