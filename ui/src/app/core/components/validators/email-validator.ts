import { ValidatorFn, Validators } from "@angular/forms";
import { AbstractValidator } from "./abstract-validator"

export class EmailValidator extends AbstractValidator {
    
    public name(): string {
        return "email";
    }
    public getValidatorFn(): ValidatorFn {
        return Validators.email;
    }

}