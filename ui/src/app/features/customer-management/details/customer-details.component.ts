import { OnInit, Component, ViewChild,LOCALE_ID, Inject } from '@angular/core';
import {Customer} from '@app/01_models/Customer';
import {CustomerService} from '../customer.api.service';
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
export class CustomerDetailsComponent implements OnInit{

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private dialogRef: DynamicDialogRef,
    private config: DynamicDialogConfig,

  ) {

  }

  ngOnInit(): void {

  }
  getId():string {
    return this.config.data.id;
  }
  getMode():DialogMode {
    return this.config.data.mode;
  }
  onClose() {
    this.dialogRef.close();
  }
}
