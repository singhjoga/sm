import { OnInit, Component, ViewChild, LOCALE_ID, Inject, Input, forwardRef } from '@angular/core';
import { Customer } from '@app/01_models/Customer';
import { CommonFields, Constants, DialogMode } from '@app/shared/constants';
import { ControlValueAccessor, FormBuilder, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { FormConroller } from '@app/core/classes/form-controller';
import { ErrorResponse } from '@app/01_models/RestResponse';
import { SnackbarService } from '@app/core/services/snackbar.service';
import { Language } from '@app/01_models/Language';
import { SystemService } from '@app/system/system-service';
import { AbstractControl } from '@app/core/components/controls/abstract-control';
import { FormControllerService } from '@app/core/classes/form-controller-service';
import { ResourceControl } from '@app/core/components/controls/resource-control-interface';
import { CustomerService } from '@app/features/customer-management/customer.api.service';
import { RefData } from '@app/01_models/RefData';
import { Settings } from '@app/system/Settings';
@Component({
  selector: 'customer-basic-info',
  templateUrl: './customer-basic-info.component.html',
  styleUrls: ['./customer-basic-info.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomerBasicInfoComponent),
      multi: true
    }
  ]
})
export class CustomerBasicInfoComponent extends FormConroller<Customer> implements OnInit, ControlValueAccessor, ResourceControl {
  @Input() id?: string | undefined;
  @Input() mode: DialogMode=DialogMode.View;

  readonly FIELD_FIRST_NAME = 'firstName';
  readonly FIELD_LAST_NAME = 'lastName';
  readonly FIELD_EMAIL = 'email';
  readonly FIELD_MOBILE = 'mobile';
  readonly FIELD_PHONE = 'phone';
  readonly FIELD_LANGUAGE_ID = 'languageId';
  readonly FIELD_BIRTH_DATE = 'birthDate';
  readonly FIELD_SEX_TYPE = 'sexType';
  readonly FIELD_IS_DISABLED = CommonFields.IsDisabled;
  readonly formGroup = this.fb.group({
    [this.FIELD_FIRST_NAME]: [null, [Validators.required]],
    [this.FIELD_LAST_NAME]: [null],
    [this.FIELD_EMAIL]: [null, [Validators.email, Validators.required]],
    [this.FIELD_MOBILE]: [null],
    [this.FIELD_PHONE]: [null],
    [this.FIELD_LANGUAGE_ID]: [null],
    [this.FIELD_BIRTH_DATE]: [null],
    [this.FIELD_SEX_TYPE]: [null],
    [this.FIELD_IS_DISABLED]: [false],
  });
  languages: Language[] = [];
  sexTypes: RefData[] = [];
  obj!: Customer;
  _onChangeCallbak = (_: any) => {};
  constructor(
    private fb: FormBuilder,
    private systemService: SystemService,
    service: CustomerService,
    public settings: Settings
  ) {
    super("customer-basic-info", service);
  }


  ngOnInit(): void {
    this.systemService.getLangues().then(resp => {
      this.languages = resp;
    });
    this.systemService.getSexTypes().then(resp => {
      this.sexTypes = resp;
    });  

    if (this._onChangeCallbak) {
      this.formGroup.valueChanges.subscribe(change => {
        this._onChangeCallbak(change);
      })
    }

    super.init();
    if (this.getMode() == DialogMode.Add) {
      this.setDisabled(this.FIELD_IS_DISABLED,true);
    }
  }
  selectedLanguage(): Language | null {
    var id = this.getValue(this.FIELD_LANGUAGE_ID);
    if (!id) {
      return null;
    }
    for (var lang of this.languages) {
      if (lang.id == id) {
        return lang;
      }
    }
    return null;
  }
  public getFormGroup(): FormGroup {
    return this.formGroup;
  }
  public newObj(): Customer {
    return new Customer();
  }
  public getMode(): DialogMode {
    return this.mode;
  }
  public getId(): string {
    return this.id!;
  }
  writeValue(obj: any): void {
    if (obj) {
      if (!(obj instanceof Customer)) {
       // throw new Error("Only Customer type is expected");
      }
      this.obj=obj;
      this.model2Form(obj);
    }
  }
  readValue(): Customer {
    if (this.obj) {
      this.obj= this.newObj();
    }
    this.form2Model(this.obj);
    return this.obj;
  }
  registerOnChange(fn: any): void {
    this._onChangeCallbak=fn;
  }
  registerOnTouched(fn: any): void {

  }
}
