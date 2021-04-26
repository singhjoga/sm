/* eslint-disable @typescript-eslint/camelcase */
import jwt_decode from "jwt-decode";
import { post, ApiError, bus } from "../api/api";

//import Keycloak from 'keycloak-js';

export interface LoginResponse {
    "access_token": string;
    "token_type": string;
    "expires_in": number;
}

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
console.log("Auth API Initialized")
export interface User {
    name: string;
    email: string;
    isAdmin?: boolean;
    isSysAdmin?: boolean;
    isCustomer?: boolean;
}
export enum AuthConstants {
    ROLE_CUSTOMER = "sm_customer",
    ROLE_ADMIN = "sm_client_admin",
    ROLE_SYSADMIN = "sm_sys_admin",
}
let isUserLoggedIn = false
let initSuccess = false
let keycloak = null

export class AuthApi {
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
  
        return isUserLoggedIn
    }
    
    public async loginUserKeycloak(): Promise<User> {
        try {
            await keycloak.login()
           // const token = keycloak.token
           // const user: User = this.parseUser(token)
           // localStorage.setItem("user", JSON.stringify(user));
           //localStorage.setItem("jwt", token);
            return this.getUser()
        } catch (e) {
            console.error(e)
        } finally {
            console.error("Login done!")
        }

    }
    getUser(): User | null {
        //const accessToken = localStorage.getItem("jwt")
        if (isUserLoggedIn === false) {
            return null;
        }

        const user: User = { name: keycloak.idTokenParsed.name, email: keycloak.idTokenParsed.email, isAdmin: false };
        user.isCustomer = keycloak.hasRealmRole(AuthConstants.ROLE_CUSTOMER);
        user.isAdmin = keycloak.hasRealmRole(AuthConstants.ROLE_ADMIN);
        user.isSysAdmin = keycloak.hasRealmRole(AuthConstants.ROLE_SYSADMIN);

        return user;

        return user;
    }
    public async logoutUser() {
       // localStorage.removeItem("user")
        //localStorage.removeItem("jwt")
        await keycloak.logout()
        isUserLoggedIn=false
    }
}

export function initAuth(initOK: boolean, loginOK: boolean, keycloakObj) {
    initSuccess=initOK
    isUserLoggedIn=loginOK
    keycloak=keycloakObj
}
export const authApi = new AuthApi()

