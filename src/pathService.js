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
        const fileStat = await fs.lstat(newPath);
        if(!fileStat.isDirectory()) throw Error('Destination should be a directory');
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
     * Joins two paths string into single one
     * @param {string} pathA path to join to
     * @param {string} pathB path that would be joined to the end of pathA
     * @returns {string} Resulting string
     */
    join(pathA, pathB)
    {
        return path.join(pathA, pathB);
    }

    /**
     * Validates given path to 'name' only
     * @param {string} pathString input string containing directory name
     * @returns {boolean}
     *  **true** if contains directory name only.
     *  **false** if contains path.
     */
    validateSingleDirectoryName(pathString) {
        const parsedPath = path.parse(pathString);
        return !(parsedPath.dir || parsedPath.root);
    }

    /**
     * Validates given path as one, that has no extension
     * @param {string} pathString input string containing absolute or relative path
     * @returns {boolean}
     * **true** if doesn't contain extension.
     * **false** if contains extension.
     */
    validateDirectoryName(pathString) {
        const parsedPath = path.parse(pathString);
        return !(parsedPath.ext);
    }

    /**
     * Validates given path as one, that has no directory, filename only
     * @param {string} pathString input file name
     * @returns {boolean}
     * **true** filename only.
     * **false** if contains directory.
     */
    validateSingleFileName(pathString) {
        const parsedPath = path.parse(pathString);
        return !(parsedPath.dir);
    }
}

const pathHandler = new PathService(os.homedir());
export const getPathHandler = () => pathHandler;
