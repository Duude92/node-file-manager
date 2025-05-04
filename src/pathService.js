import os from 'node:os'
import path from 'node:path';
import fs from 'node:fs/promises';

const discRegex = /^.:$/

class PathService {
    constructor(homePath) {
        this._homepath = homePath;
        this._cwd = homePath;
        this._regex = new RegExp(discRegex, 'i');
    }

    get cwd() {
        return this._cwd;
    }

    get homePath() {
        return this._homepath;
    }

    async cd(relativePath) {
        if (this._regex.test(relativePath)) {
            relativePath = path.join(relativePath, '/');
        }
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

    /**
     * Validates given path to 'name' only
     * @param pathString input string containing directory name
     * @returns {boolean}
     *  **true** if contains directory name only.
     *  **false** if contains path.
     */
    validateDirectoryName(pathString) {
        const parsedPath = path.parse(pathString);
        return !(parsedPath.dir || parsedPath.root);
    }
}

const pathHandler = new PathService(os.homedir());
export const getPathHandler = () => pathHandler;
