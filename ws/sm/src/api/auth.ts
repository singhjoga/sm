/* eslint-disable @typescript-eslint/camelcase */
import jwt_decode from "jwt-decode";
import { post, ApiError, bus } from "../api/api";
//import Keycloak from 'keycloak-js';

export interface LoginResponse {
    "access_token": string;
    "token_type": string;
    "expires_in": number;
}

const initOptions = {
    url: "http://localhost:8080/auth/",
    realm: "sm",
    clientId: "sm-ui",
    silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html'
    //    onLoad: "login-required"
};

let keycloakInitialized = false
let isUserLoggedIn = false
let isInitError = false
export interface AccessToken {
    iss: string;
    sub: string;
    aud: string[] | string;
    exp: number;
    nbf?: number;
    iat?: number;
    jti?: string;
    name: string;
    role: string[];
}
const keycloak = null; //Keycloak(initOptions)
console.log("Auth API Initialized")
export interface User {
    name: string;
    email: string;
    isAdmin?: boolean;
    isSysAdmin?: boolean;
    isCustomer?: boolean;
}
export enum AuthConstants {
    ROLE_CUSTOMER = "customer",
    ROLE_ADMIN = "admin",
    ROLE_SYSADMIN = "sysadmin",
}

export class Api {
    parseUser(token: string): User {
        const accessToken: AccessToken = jwt_decode(token);
        const user: User = { name: accessToken.name, email: accessToken.sub, isAdmin: false };
        user.isCustomer = accessToken.role.includes(AuthConstants.ROLE_CUSTOMER);
        user.isAdmin = accessToken.role.includes(AuthConstants.ROLE_ADMIN);
        user.isSysAdmin = accessToken.role.includes(AuthConstants.ROLE_SYSADMIN);

        return user;
    }
    
    public async getAccessToken() {
        return keycloak.token
    }
    public async isUserLoggedIn() {
        if (isInitError) {
          //  keycloak.login().then((success) => {
          //      console.log("Login success=" + success)
          //  })
        }
        return isUserLoggedIn
    }
    public async loginUserKeycloak(): Promise<User> {
        try {
            const token = keycloak.token
            const user: User = this.parseUser(token)
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("jwt", token);
            return user
        } catch (e) {
            console.error(e)
        } finally {
            console.error("Login done!")
        }

    }
    public async loginUser(email: string, password: string): Promise<User> {
        const bodyObj = {
            email: email,
            password: password
        };
        const resp = await post("/api/login", bodyObj)
        const token = resp.access_token
        const user: User = this.parseUser(token)
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("jwt", token);
        return user

    }
    getUser(): User | null {
        const accessToken = localStorage.getItem("jwt")
        if (accessToken === null) {
            return null;
        }
        const user: User = this.parseUser(accessToken)

        return user;
    }
    public async logoutUser() {
        await this.initKeycloak()
        localStorage.removeItem("user")
        localStorage.removeItem("jwt")
        await keycloak.logout()
    }
}
export const authApi = new Api();

