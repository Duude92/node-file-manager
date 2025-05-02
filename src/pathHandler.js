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

    async cd(relativePath) {
        const newPath = path.resolve(this._cwd, relativePath);
        await fs.access(newPath, fs.constants.R_OK);
        this._cwd = newPath;
    }

    async ls(relativePath) {
        const nPath = path.resolve(this._cwd, relativePath);
        return await fs.readdir(nPath, {withFileTypes: true})
    }

    resolvePath(relativePath) {
        return path.resolve(this._cwd, relativePath);
    }
}

const pathHandler = new PathHandler(os.homedir());
export const getPathHandler = () => pathHandler;
