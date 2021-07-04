import { OnInit, Component, ViewChild,LOCALE_ID, Inject } from '@angular/core';
import {Customer} from '@app/01_models/Customer';
import {CustomerService} from '../customer.service';
import {CommonFields, DialogMode} from '@app/shared/constants';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import {FormConroller} from '@app/core/components/controls/form-controller';
import { RequiredValidator } from '@app/core/components/validators/required-validator';
import { EmailValidator } from '@app/core/components/validators/email-validator';
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
    [this.FIELD_FIRST_NAME]: [null, [new RequiredValidator]],
    [this.FIELD_LAST_NAME]: [null],
    [this.FIELD_EMAIL]: [null,[new EmailValidator, new RequiredValidator]],
    [this.FIELD_STREET]: [null, [new RequiredValidator]],
    [this.FIELD_HNO]: [null],
    [this.FIELD_AREA]: [null],
    [this.FIELD_CITY]: [null],
    [this.FIELD_STATE]: [null],  
    [this.FIELD_COUNTRY_ID]: [null], 
    [this.FIELD_ZIP_CODE]: [null, [new RequiredValidator]],
    [this.FIELD_MOBILE]: [null],
    [this.FIELD_PHONE]: [null],
    [this.FIELD_LANGUAGE_ID]: [null],
    [this.FIELD_IS_DISABLED]: [false],
  });

  obj: Customer = new Customer();
  @ViewChild('frm') 
  public userFrm?: NgForm;
  constructor(
    @Inject(LOCALE_ID) private locale: string,
    public matDialog: MatDialog,
    private service: CustomerService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CustomerDetailsComponent>,
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
      this.service.findById(this.id()).subscribe(resp => {
        this.obj=resp;
        this.model2Form(this.obj);
      })
    }
   // super.init();
  }
  add() {
    
  }
  model2Form(obj:Customer) {
    Object.keys(this.formGroup.controls).forEach(key => {
      let value:any = obj[key];
      if (!(value == undefined || value==null)) {
        let control:AbstractControl  = this.formGroup.controls[key];
        control.setValue(value);
      }
    });
  }
  form2Model(obj:Customer) {
    Object.keys(this.formGroup.controls).forEach(key => {
      let control:AbstractControl  = this.formGroup.controls[key];
      let value:any = control.value;
      if (obj[key] != undefined) {
        obj[key]=value;
      }
    });
  }
  onClose() {
    this.dialogRef.close();
  }
  onSave() {
    let f=this.userFrm;
    this.form2Model(this.obj);
    this.service.add(this.obj).subscribe(id => {
      this.dialogRef.close(id);
    })
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