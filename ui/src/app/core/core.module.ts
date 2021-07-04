import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from '../shared/angular-material.module';
import {KeycloakService} from './services/keycloak.service'
import {HttpClientService} from './services/http-client.service'
import {SnackbarService} from './services/snackbar.service'
import {NumericDirective} from './directives/number-input-directive'
import {InputControl} from './components/controls/input/input-control'
import { FlexLayoutModule } from '@angular/flex-layout';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {TranslateModule, TranslateLoader, TranslateService, TranslateStore  } from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {CustomMissingTranslationHandler} from './missing-translation';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http,'/assets/i18n/', '.json');
}

@NgModule({ 
  declarations: [  
    NumericDirective,
    InputControl
  ],
  imports: [
    AngularMaterialModule,
    CommonModule,
    FlexLayoutModule,
    HttpClientModule,
    TranslateModule.forChild({
      defaultLanguage: 'en',
     // missingTranslationHandler: {provide: CustomMissingTranslationHandler, useClass: CustomMissingTranslationHandler},
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      },
      isolate: false
    })
  ],
  exports: [
    NumericDirective,
    InputControl,
    FlexLayoutModule,
    TranslateModule
    ],
  providers: [
    KeycloakService,
    HttpClientService,
    SnackbarService,
    CustomMissingTranslationHandler,
    TranslateService,
    TranslateStore 
  ]
})
export class CoreModule { }
