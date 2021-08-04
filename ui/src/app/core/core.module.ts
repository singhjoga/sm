import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimengModule } from '../shared/primeng.module';
import { KeycloakService } from './services/keycloak.service';
import { HttpClientService } from './services/http-client.service';
import { SnackbarService } from './services/snackbar.service';
import { NumericDirective } from './directives/number-input-directive';
import { InputControl } from './components/controls/input/input-control';
import { DropdownControl } from './components/controls/dropdown/dropdown-control';
import { CheckboxControl } from '@app/core/components/controls/checkbox/checkbox-control';
import { FormError } from './components/controls/form-error/form-error'
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService, TranslateStore } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CustomMissingTranslationHandler } from './missing-translation';
import { ConfirmationDialog } from './components/dialogs/confirmation-dialog/confirmation-dialog';
import { DialogUtil } from './components/dialogs/dialog-service';
import {InjectorModule} from './injector.module';
import { TableFilterDirective } from './directives/table-filter';
import { TableColumnFilterDirective } from './directives/table-column-filter';
import { ConfirmationDialogNg } from '@app/core/components/dialogs/confirmation-dialog-ng/confirmation-dialog-ng';
import { ConfirmationService } from 'primeng/api';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    NumericDirective,
    InputControl,
    FormError,
    ConfirmationDialog,
    TableColumnFilterDirective,
    TableFilterDirective,
    ConfirmationDialogNg,
    DropdownControl,
    CheckboxControl
  ],
  imports: [
    PrimengModule,
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
    InjectorModule,
    TableColumnFilterDirective,
    TableFilterDirective,
    ConfirmationDialogNg,
    DropdownControl,
    CheckboxControl
  ],
  providers: [
    KeycloakService,
    HttpClientService,
    SnackbarService,
    CustomMissingTranslationHandler,
    TranslateService,
    TranslateStore,
    DialogUtil,
    ConfirmationService
  ]
})
export class CoreModule {
  constructor() {
  }
}
