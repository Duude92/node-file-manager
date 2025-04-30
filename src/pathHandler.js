import os from 'node:os'
import path from 'node:path';
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
    cd(relativePath){
        this._cwd = path.resolve(this._cwd, relativePath);
    }

}
const pathHandler = new PathHandler(os.homedir());
export const getPathHandler = () => pathHandler;
