import { CommandBase } from "../../commandBase.js";
import fs from "node:fs/promises";
import crypto from "node:crypto";
import { displayResultLine } from "../../../messages/messageManager.mjs";

class CommandHash extends CommandBase {
    constructor() {
        super("hash");
    }

    async performCommand(cwd, args) {
        if (args.length === 0) {
            throw new Error("No arguments provided for hash command.");
        }
        const filePath = this._pathHandler.resolvePath(args[0]);

        const fileContent = await fs.readFile(filePath, { encoding: "utf-8" });
        const hash = crypto.createHash("sha256").update(fileContent).digest("hex");
        displayResultLine(`Hash of ${filePath}: ${hash}`);
    }
}
export const createCommand = () => new CommandHash();