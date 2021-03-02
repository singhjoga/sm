/* eslint-disable @typescript-eslint/camelcase */
import jwt_decode from "jwt-decode";

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

    public loginUser(resp: LoginResponse): User {
        const user: User = this.parseUser(resp.access_token)
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("jwt", resp.access_token);

        return user;
    }
    getUser(): User | null {
        const accessToken = localStorage.getItem("jwt")
        if (accessToken === null) {
            return null;
        }
        const user: User = this.parseUser(accessToken)

        return user;
    }
    logoutUser() {
        localStorage.removeItem("user")
        localStorage.removeItem("jwt")
    }
}
export const api = new Api();

