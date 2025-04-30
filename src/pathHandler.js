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
const pathHandler = new PathHandler(os.homedir());
export const getPathHandler = () => pathHandler;
