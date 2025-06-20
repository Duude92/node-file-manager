import * as messageManager from '#MessageManager';
class UserHandler {
    constructor() {
        this._username = '';
    }

    get username() {
        return this._username;
    }

    set username(newUsername) {
        this._username = newUsername;
    }
    greet() { messageManager.displayGreeting(this._username); }
    goodbye() { messageManager.displayGoodbye(this._username); }
}
const userHandler = new UserHandler();
export const getUserHandler = () => userHandler;