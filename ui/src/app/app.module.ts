import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NavigationModule } from './00_navigation/navigation.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import {TranslateModule} from '@ngx-translate/core';
import { PrimengModule } from './shared/primeng.module';
import { LayoutModule } from '@angular/cdk/layout';
import { CoreModule } from './core/core.module';
import { CustomerManagementModule } from './features/features.module'
import { HomeComponent } from './02_home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { SystemModule } from '@app/system/system.module';
import { Settings } from './system/Settings';
import { Observable } from 'rxjs';
import { OAuthService, NullValidationHandler, AuthConfig } from 'angular-oauth2-oidc';
//import { FlexLayoutModule } from '@angular/flex-layout'
export const authCodeFlowConfig: AuthConfig = {
  issuer: 'https://keycloak.chessbuddy.com/auth/realms/chessbuddy',

  // URL of the SPA to redirect the user to after login
  redirectUri: window.location.origin + '/index.html',
  clientId: 'ui',
  responseType: 'code',
  scope: true
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
function initialize(settings: Settings, oauthService: OAuthService){
  return () => {
    const observable = new Observable((subscriber) => {
      oauthService.configure(authCodeFlowConfig);
      oauthService.loadDiscoveryDocumentAndTryLogin().then((result) => {
          if (result) {
            const claims = oauthService.getIdentityClaims();
            const accToken = oauthService.getAccessToken();
            if (claims) {
             var username = claims['given_name'];
             console.log('username='+username)
            }
          }
          subscriber.next(0);
          subscriber.complete();
        });
    });
    return observable;
  }
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    PrimengModule,
    BrowserModule,
    CoreModule,
    NavigationModule,
    BrowserAnimationsModule,
  //  TranslateModule,
    LayoutModule,
    HttpClientModule,
    CustomerManagementModule,
    AppRoutingModule,
    SystemModule
   // FlexLayoutModule
  ],
  
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: initialize,
    deps: [Settings, OAuthService],
    multi: true
  },],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
