import fs from 'node:fs/promises';
import { CommandBase } from './commandBase.js';
class CommandLs extends CommandBase{
    constructor(){
        super('ls');
    }
    async performCommand(args){
        try{
            return await fs.readdir('./');
        }
        catch(err){
            console.error('Error reading directory:', err);
            return 'Error reading directory';
        }
    }
}
export const createCommandLs = () => new CommandLs();