import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from '../shared/angular-material.module';
import { KeycloakService } from './services/keycloak.service';
import { HttpClientService } from './services/http-client.service';
import { SnackbarService } from './services/snackbar.service';
import { NumericDirective } from './directives/number-input-directive';
import { InputControl } from './components/controls/input/input-control';
import { FormError } from './components/controls/form-error/form-error'
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService, TranslateStore } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CustomMissingTranslationHandler } from './missing-translation';
import { ConfirmationDialog } from './components/dialogs/confirmation-dialog/confirmation-dialog';
import { DialogService } from './components/dialogs/dialog-service';
import {InjectorModule} from './injector.module';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    NumericDirective,
    InputControl,
    FormError,
    ConfirmationDialog
  ],
  imports: [
    AngularMaterialModule,
    CommonModule,
    FlexLayoutModule,
    HttpClientModule,
    InjectorModule,
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
    TranslateModule,
    FormError,
    ConfirmationDialog,
    InjectorModule
  ],
  providers: [
    KeycloakService,
    HttpClientService,
    SnackbarService,
    CustomMissingTranslationHandler,
    TranslateService,
    TranslateStore,
    DialogService
  ]
})
export class CoreModule {
  constructor() {
  }
}
