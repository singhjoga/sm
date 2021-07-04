import { ValidatorFn, Validators } from "@angular/forms";
import { AbstractValidator } from "./abstract-validator"

export class RequiredValidator extends AbstractValidator {
    
    public name(): string {
        return "required";
    }
    public getValidatorFn(): ValidatorFn {
        return Validators.required;
    }

}