import os from 'node:os'
import path from 'node:path';
import fs from 'node:fs/promises';
class PathHandler {
    constructor(homePath) {
        this._homepath = homePath;
        this._cwd = homePath;
    }
    get cwd() {
        return this._cwd;
    }
    get homepath() {
        return this._homepath;
    }
    // FIXME: Throw error if path is not valid
    cd(relativePath) {
        this._cwd = path.resolve(this._cwd, relativePath);
    }
    async ls(relativePath) {
        const nPath = path.resolve(this._cwd, relativePath);
        return await fs.readdir(nPath, { withFileTypes: true })
    }
    resolvePath(relativePath) {
        return path.resolve(this._cwd, relativePath);
    }

}
const pathHandler = new PathHandler(os.homedir());
export const getPathHandler = () => pathHandler;
