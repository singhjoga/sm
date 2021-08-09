import { OnInit, Component, ViewChild,LOCALE_ID, Inject } from '@angular/core';
import {Customer} from '@app/01_models/Customer';
import {CustomerService} from '../customer.service';
import {CommonFields, Constants, DialogMode} from '@app/shared/constants';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import {DynamicDialogRef, DynamicDialogConfig} from 'primeng/dynamicdialog';
import { FormGroup, FormControl, NgForm } from '@angular/forms'; 
import {FormConroller} from '@app/core/classes/form-controller';
import { ErrorResponse } from '@app/01_models/RestResponse';
import { SnackbarService } from '@app/core/services/snackbar.service';
import { Language } from '@app/01_models/Language';
import { SystemService } from '@app/system/system-service';
@Component({
  selector: 'customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss'],
  viewProviders:[{provide: FormConroller, useClass: CustomerDetailsComponent}]
})
export class CustomerDetailsComponent extends FormConroller<Customer> implements OnInit{
  readonly FIELD_FIRST_NAME='firstName';
  readonly FIELD_LAST_NAME='lastName';
  readonly FIELD_EMAIL='email';
  readonly FIELD_STREET='street';
  readonly FIELD_HNO='houseNo';
  readonly FIELD_AREA='area';
  readonly FIELD_CITY='city';
  readonly FIELD_STATE='state';
  readonly FIELD_ZIP_CODE='zipCode';
  readonly FIELD_MOBILE='mobile';
  readonly FIELD_PHONE='phone';
  readonly FIELD_COUNTRY_ID='countryId';
  readonly FIELD_LANGUAGE_ID='languageId';
  readonly FIELD_IS_DISABLED=CommonFields.IsDisabled;
  readonly formGroup = this.createFormGroup({
    [this.FIELD_FIRST_NAME]: [null, [Validators.required]],
    [this.FIELD_LAST_NAME]: [null],
    [this.FIELD_EMAIL]: [null,[Validators.email, Validators.required]],
    [this.FIELD_STREET]: [null, [Validators.required]],
    [this.FIELD_HNO]: [null],
    [this.FIELD_AREA]: [null],
    [this.FIELD_CITY]: [null],
    [this.FIELD_STATE]: [null],  
    [this.FIELD_COUNTRY_ID]: [null], 
    [this.FIELD_ZIP_CODE]: [null, [Validators.required]],
    [this.FIELD_MOBILE]: [null],
    [this.FIELD_PHONE]: [null],
    [this.FIELD_LANGUAGE_ID]: [null],
    [this.FIELD_IS_DISABLED]: [false],
  });
  languages:Language[]=[];
  constructor(
    @Inject(LOCALE_ID) private locale: string,
    service: CustomerService,
    private fb: FormBuilder,
    dialogRef: DynamicDialogRef,
    config: DynamicDialogConfig,
    private systemService: SystemService
  ) {
    super(Constants.inst.CUSTOMER_DETAILS, config, service, dialogRef);
  }
  getFormGroup(): FormGroup {
    return this.formGroup;
  }

  ngOnInit(): void {
    this.systemService.getLangues().then(resp =>{
      this.languages=resp;
    });
    if (this.mode()==DialogMode.Add) {
      this.getFormGroup().controls[this.FIELD_IS_DISABLED].disable();
    }
    super.init();
  }
  selectedLanguage():Language|null {
    var id = this.getValue(this.FIELD_LANGUAGE_ID);
    if (!id) {
      return null;
    }
    for (var lang of this.languages) {
      if (lang.id==id) {
        return lang;
      }
    }
    return null;
  }
  public newObj(): Customer {
    return new Customer();
  }
}
