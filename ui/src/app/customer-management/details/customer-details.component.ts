import { OnInit, Component, ViewChild,LOCALE_ID, Inject } from '@angular/core';
import {Customer} from '@app/01_models/Customer';
import {CustomerService} from '../customer.service';
import {CommonFields, Constants, DialogMode} from '@app/shared/constants';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import {DynamicDialogRef, DynamicDialogConfig} from 'primeng/dynamicdialog';
import { FormGroup, FormControl, NgForm } from '@angular/forms'; 
import {FormConroller} from '@app/core/classes/form-controller';
import { Language } from '@app/01_models/Language';
import { SystemService } from '@app/system/system-service';
import { FormDialogConroller } from '@app/core/classes/form-dialog-controller';
import { FormControllerService } from '@app/core/classes/form-controller-service';
import { ErrorResponse } from '@app/01_models/RestResponse';
@Component({
  selector: 'customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss'],
  viewProviders:[FormControllerService]
})
export class CustomerDetailsComponent extends FormDialogConroller<Customer> implements OnInit{
  readonly FIELD_BASIC_INFO='basicInfo';
  readonly FIELD_ADDRESS='address';
  readonly formGroup = this.createFormGroup({
    [this.FIELD_BASIC_INFO]: [null],
    [this.FIELD_ADDRESS]: [null],
  });
  constructor(
    @Inject(LOCALE_ID) private locale: string,
    service: CustomerService,
    dialogRef: DynamicDialogRef,
    config: DynamicDialogConfig,
    private systemService: SystemService,
    private controllerService: FormControllerService
  ) {
    super(Constants.inst.CUSTOMER_DETAILS, config, service, dialogRef);
    controllerService.setMode(config.data.mode);
  }
  getFormGroup(): FormGroup {
    return this.formGroup;
  }

  ngOnInit(): void {

    if (this.mode()==DialogMode.Add) {
     // this.getFormGroup().controls[this.FIELD_IS_DISABLED].disable();
    }
    //super.init();
    if (this.mode() == DialogMode.Add) {
      this.obj = this.newObj();
      this.model2Form(this.obj);
    } else {
      this.service.findById(this.id()).then(resp => {
        this.obj = resp;
        this.formGroup.controls[this.FIELD_BASIC_INFO].setValue(this.obj);
      });
    }
  }
  onSave() {
    //this.form2Model(this.obj);
    this.obj = this.formGroup.controls[this.FIELD_BASIC_INFO].value;

    this.save().then(result => {
      this.snackbar.showSuccess(this.getMessageText('save-success'));
      this.dialogRef.close(result);
    },
      (error: ErrorResponse) => {
        this.errorMessages = this.getApiErrorAsString(error);
      }
    );
  }
  public newObj(): Customer {
    return new Customer();
  }
}
