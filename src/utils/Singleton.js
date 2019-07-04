export default class Singleton {

    static myInstance = null;

    user = null;
    bot = null;
    permissions = null;
    selectedUser = null;
    users = [];

    /**
     * @returns {Singleton}
     */
    static getInstance() {
        if (Singleton.myInstance == null) {
            Singleton.myInstance = new Singleton();
        }

        return this.myInstance;
    }

    getUser() {
        return this.user;
    }

    setUser(user) {
        this.user = user;
    }

    getBot() {
        return this.bot;
    }

    setBot(bot) {
        this.bot = bot;
    }

    getPermissions(){
        return this.permissions;
    }

    setPermissions(permissions){
        this.permissions = permissions;
    }

    getSelectedConversationUser() {
        return this.selectedUser;
    }

    setSelectedConversationUser(selectedUser) {
        this.selectedUser = selectedUser;
    }

    getBotUsers() {
        return this.users;
    }

    setBotUsers(users) {
        this.users = users;
    }

}