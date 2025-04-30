class commandBase {
    constructor(commandstring){
        this._command = commandstring;
    }
    supportsCommand(commandstring){
        return this._command === commandstring;
    }
    performCommand(commandstring, args){}

}