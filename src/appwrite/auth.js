import { Client, Account, ID } from 'appwrite'
import config from '../config/config'

class AuthService {
    client
    account

    constructor() {
        this.client = new Client()
            .setEndpoint(config.appwriteEndpoint)
            .setProject(config.appwriteProjectId);

        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                return this.login({ email, password });
            } else {
                console.log("Cannot create a new account");
            }
        } catch (error) {
            console.log(`Error while creating new account:${error}`);
        }
    }

    async login({ email, password }) {
        try {
            const userLogin = await this.account.createEmailPasswordSession(email, password);
            if (userLogin) {
                return true;
            } else {
                console.log("Cannot login")
            }
        } catch (error) {
            console.log(`Error while login:${error}`);
        }
    }

    async getLoggedInUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log(`Error while getting logged in user details:${error}`);
        }
    }

    async logout() {
        try {
            const userLogout = await this.account.deleteSession('current');
            if (userLogout) {
                return userLogout;
            } else {
                console.log("Cannot logout")
            }
        } catch (error) {
            console.log(`Error while login:${error}`);
        }
    }
}

const authService = new AuthService();

export default authService