import { OnInit, Component, ViewChild,LOCALE_ID, Inject } from '@angular/core';
import {Customer} from '@app/01_models/Customer';
import {CustomerService} from '../customer.service';
import {CommonFields, DialogMode} from '@app/shared/constants';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, NgForm } from '@angular/forms'; 
import {FormConroller} from '@app/core/classes/form-controller';
import { ErrorResponse } from '@app/01_models/RestResponse';
import {TranslateService} from '@ngx-translate/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { SnackbarService } from '@app/core/services/snackbar.service';
@Component({
  selector: 'customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss'],
  viewProviders:[{provide: FormConroller, useClass: CustomerDetailsComponent}]
})
export class CustomerDetailsComponent extends FormConroller implements OnInit{
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

  obj: Customer = new Customer();
  errorMessages:string[]=[];
  @ViewChild('frm') 
  public userFrm?: NgForm;
  constructor(
    @Inject(LOCALE_ID) private locale: string,
    public matDialog: MatDialog,
    private service: CustomerService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CustomerDetailsComponent>,
    private snackbar: SnackbarService,
    @Inject(MAT_DIALOG_DATA) private data: {
      mode: DialogMode, id: string
    }
  ) {
    super();
  }
  getFormGroup(): FormGroup {
    return this.formGroup;
  }

  ngOnInit(): void {
    if (this.mode()==DialogMode.Add) {
      this.model2Form(this.obj);
      this.formGroup.controls[this.FIELD_IS_DISABLED].disable();
    }else{
      this.service.findById(this.id()).then(resp => {
        this.obj=resp;
        this.model2Form(this.obj);
      })
    }
    super.init();
  }
  model2Form(obj:Customer) {
    Object.keys(this.formGroup.controls).forEach(key => {
      let value:any = obj[key];
      let control:AbstractControl  = this.formGroup.controls[key];
      if (!(value == undefined || value==null)) {
        control.setValue(value);
      }
      if (this.mode() == DialogMode.View) {
        control.disable();
      }
  });
  }
  form2Model(obj:Customer) {
    Object.keys(this.formGroup.controls).forEach(key => {
      let control:AbstractControl  = this.formGroup.controls[key];
      let value:any = control.value;
      if (value =='') {
        value=null;
      }
      if (obj[key] != undefined) {
        obj[key]=value;
      }
    });
  }
  onClose() {
    this.dialogRef.close();
  }
  onSave() {
    this.form2Model(this.obj);
    this.service.add(this.obj).then(id => {
      this.snackbar.showSuccess(this.getMessageText('save-success'));
      this.dialogRef.close(id);
    },
    (error: ErrorResponse) => {
      this.errorMessages=this.getApiErrorAsString(error);
    }
    );
  }

  mode(): DialogMode {
    return this.data.mode;
  }
  id():string {
    return this.data.id;
  }
  isEdit() {
    return this.mode() == DialogMode.Edit;
  }
  isAdd() {
    return this.mode() == DialogMode.Add;
  }
  isReadOnly() {
    return this.mode() == DialogMode.View;
  }
  modeText() {
    return DialogMode[this.mode()];
  }
  isRequired(el) {
    return true;
  }
}
