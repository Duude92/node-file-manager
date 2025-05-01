import { createCommandCompress } from "./utilitycommands/commandCompress.js";
import { createCommandDecompress } from "./utilitycommands/commandDecompress.js";
import { createCommandHash } from "./utilitycommands/commandHash.js";

const utilities = [
    createCommandHash(),
    createCommandCompress(),
    createCommandDecompress()
]
export { utilities }