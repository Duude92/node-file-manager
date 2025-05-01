import { displayResultLine } from "../../../messages/messageManager.mjs";
import { CommandBase } from "../../commandBase.js";
import { cpus } from "node:os";

class CommandCpus extends CommandBase {
    constructor() {
        super('--cpus');
    }

    async performCommand(argv) {
        const processors = cpus();
        displayResultLine(`Number of CPUs: ${processors.length}
CPU model: ${processors[0].model}
CPU speed:
${processors.map((cpu, index) =>
`   ${`CPU ${index}`.padEnd(8)} ${cpu.speed} MHz\n`).join('')}`);
    }
}
export const createCommand = () => new CommandCpus();