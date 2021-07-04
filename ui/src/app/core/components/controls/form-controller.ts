import { FormGroup, FormControl, NgForm } from '@angular/forms';
import {CustomFormControl} from './custom-form-control';
import { AbstractValidator } from '../validators/abstract-validator';
export abstract class FormConroller {
    constructor() {
    }
    public abstract getFormGroup():FormGroup;

    protected createFormGroup(controls:Object) {
        let config = {};
        for (let key in controls) {
            config[key]=this.createFormControl(key,controls);
        }
        return new FormGroup(config);
    }
    protected createFormControl(key:string, controls:Object): CustomFormControl {
        let values = controls[key];
        let state:any;
        let validators: AbstractValidator[]|any;
        if (values && values.length) {
            if (values.length > 0) {
                state=values[0];
            }
            if (values.length > 1) {
                validators=values[1];
            }
        }
        return new CustomFormControl(state,validators);
    }
    protected init() {
        let formGroup:FormGroup=this.getFormGroup();
        formGroup.valueChanges.subscribe(() => {
            const errs = {};
            Object.keys(formGroup.controls).forEach(key => {
              let controlErrors = formGroup.get(key)?.errors;
              if (controlErrors != null) {
                Object.keys(controlErrors).forEach(keyError => {
                  console.log(key+"="+keyError)
                });
              }
            });
      
          });
    }
}