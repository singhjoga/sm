import { FormControl, ValidatorFn, Validators,} from '@angular/forms';
import { AbstractValidator } from '../validators/abstract-validator';

export class CustomFormControl extends FormControl {
  private validators?: AbstractValidator[]=[];
  constructor(formState: any = null, validators?: AbstractValidator[]) {
    super(formState,CustomFormControl.getValidatorFns(validators));
   //super(formState,Validators.email);
    this.validators=validators;
  }

  public getValidators():AbstractValidator[] {
    if (!this.validators) {
      return [];
    }
    return this.validators;
  }
  private static getValidatorFns(validators?: AbstractValidator[]):ValidatorFn[] {
    let fns:ValidatorFn[]=[];
    if (validators) {
      for (let validator of validators) {
        let fn =validator.getValidatorFn();
        fns.push(fn);
      }
    }
    return fns;
  }
}