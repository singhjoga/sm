import {ValidatorFn} from '@angular/forms';
export abstract class AbstractValidator {
    public abstract name():string;
    public abstract getValidatorFn():ValidatorFn;
}