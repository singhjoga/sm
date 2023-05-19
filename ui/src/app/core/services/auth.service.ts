
import {Injectable} from '@angular/core';
import { OAuthService, NullValidationHandler } from 'angular-oauth2-oidc';
import { AuthConfig } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
const useSilentRefreshForCodeFlow = true;
// Use HashLocationStrategy for routing?
export const useHash = false;
export const authCodeFlowConfig: AuthConfig = {
  issuer: 'https://keycloak.chessbuddy.com/auth/realms/chessbuddy',

  // URL of the SPA to redirect the user to after login
  redirectUri: window.location.origin + '/index.html',
  clientId: 'ui',
  responseType: 'code',
  scope: useSilentRefreshForCodeFlow
    ? 'openid profile email api'
    : 'openid profile email offline_access api',

 // silentRefreshRedirectUri: `${window.location.origin}/silent-refresh.html`,

 // useSilentRefresh: useSilentRefreshForCodeFlow,

  showDebugInformation: true,

 // sessionChecksEnabled: false,
  // disablePKCI: true,

 // clearHashAfterLogin: true,
  timeoutFactor: 0.01,
};

@Injectable()
export class AuthService {
    private username?: string;
    private isLoggedIn=false;
    constructor(private router: Router, private oauthService: OAuthService) {
      /*
        this.oauthService.configure(authCodeFlowConfig);
        this.oauthService.loadDiscoveryDocumentAndTryLogin().then((_) => {
            if (useHash) {
              this.router.navigate(['/']);
            }
            const claims = this.oauthService.getIdentityClaims();
           // this.username = claims['given_name'];
           // console.log('username='+this.username)
          });
          */
    }
  
    private configureCodeFlow() {
        this.oauthService.initCodeFlow();
        /*
        this.oauthService.tryLogin().then((_) => {
          if (useHash) {
            this.router.navigate(['/']);
          }
          const claims = this.oauthService.getIdentityClaims();
          this.username = claims['given_name'];
          console.log('username='+this.username)
        });
    
        // Optional
        this.oauthService.setupAutomaticSilentRefresh();
        */
    }
    authenticated(): boolean|undefined {
        var token = this.getToken();
        return token?true:false;
    }

    login() {
        this.configureCodeFlow();
       
        // Automatically load user profile
        this.oauthService.events
          .pipe(filter((e) => e.type === 'token_received'))
          .subscribe((_) => {
            console.debug('state', this.oauthService.state);
            this.oauthService.loadUserProfile();
    
            const scopes = this.oauthService.getGrantedScopes();
            console.debug('scopes', scopes);
            this.isLoggedIn=true;
          });
    }

    logout() {
        this.oauthService.logOut();
    }

    account() {
        //this.oauthService.load
    }

    getToken(): string {
        return this.oauthService.getAccessToken();
    }
}
