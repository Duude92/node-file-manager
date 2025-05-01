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
}
const userHandler = new UserHandler();
export const getUserHandler = () => userHandler;