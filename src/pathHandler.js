import os from 'node:os'
class PathHandler {
    constructor(homePath) {
        this._homepath = homePath;
        this._cwd = homePath;
    }
    get cwd() {
        return this._cwd;
    }
}
export const createPathHandler = () => new PathHandler(os.homedir);
