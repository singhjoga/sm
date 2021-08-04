import {ValidationErrors} from '@angular/forms';
import { FormConroller } from '@app/core/classes/form-controller'; 
import {TranslateService} from '@ngx-translate/core';
import { FormControl } from '@angular/forms'; 
import { AppInjector } from '../../injector.module';
export abstract class AbstractControl{
  control!: FormControl;
  errorMessage:string='';
  required:boolean=false;
  public translate:TranslateService;
  public controlName!:string;
  public controller!:FormConroller

  constructor() {
    this.translate = AppInjector.get(TranslateService);
  }
  afterViewInit(): void {
 
  }

  onInit(controlName:string, controller:FormConroller): void {
    this.controlName=controlName;
    this.controller=controller;
    
    this.control = <FormControl>this.controller.getFormGroup().controls[this.controlName];
    this.control.statusChanges.subscribe(() => {
      const errors: ValidationErrors|null = this.control.errors;
      let msg='';
      if (errors != null) {
        Object.keys(errors).forEach(keyError => {
          if (msg.length > 0) {
            msg +=', ';
          }
          msg +=this.translate.instant('errors.'+keyError);
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
