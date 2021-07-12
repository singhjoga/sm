import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { AbstractValidator } from '../components/validators/abstract-validator';
import { BaseConroller } from './base-controller';
export abstract class FormConroller extends BaseConroller{
    constructor() {
        super();
    }
    public abstract getFormGroup():FormGroup;

    protected createFormGroup(controls:Object) {
        let config = {};
        for (let key in controls) {
            config[key]=this.createFormControl(key,controls);
        }
        return new FormGroup(config);
    }
    protected createFormControl(key:string, controls:Object): FormControl {
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
        return new FormControl(state,validators);
    }
    protected init() {

    }
}