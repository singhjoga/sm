import { OnInit, Component, Input,LOCALE_ID} from '@angular/core';
import {ValidationErrors} from '@angular/forms';
import { ControlContainer,FormGroupDirective} from '@angular/forms';
import {FormConroller} from '../../../classes/form-controller';
import {TranslateService} from '@ngx-translate/core';
import { CustomFormControl } from '../custom-form-control';
@Component({
  selector: 'input-control',
  templateUrl: './input-control.html',
  styleUrls: ['./input-control.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class InputControl implements OnInit {
  @Input() 
  controlName!:string;
  @Input() 
  controller!:FormConroller;

  control!: CustomFormControl;
  errorMessage:string='';
  required:boolean=false;
  constructor(private translate:TranslateService ) {
  }
  ngOnInit(): void {
    this.control = <CustomFormControl>this.controller.getFormGroup().controls[this.controlName];
    this.control.statusChanges.subscribe(() => {
      const errors: ValidationErrors|null = this.control.errors;
      let msg='';
      if (errors != null) {
        Object.keys(errors).forEach(keyError => {
          if (msg.length > 0) {
            msg +=', ';
          }
          msg +=this.translate.instant('errors.'+keyError);
         // console.log(this.controlName+" "+keyError);
        });
      }
      this.errorMessage=msg;
    });
    this.required=this.getRequired();
  }
  getRequired():boolean {
    let ctl = this.control?.parent?.controls[this.controlName];
    if (ctl == null || !ctl.validator) return false;
    let validator = ctl.validator(ctl);
    return validator && validator.required;
  }
 
  label():string {
    return this.translate.instant('labels.'+this.controlName);
  }
}
