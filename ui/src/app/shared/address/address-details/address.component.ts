import { OnInit, Component, Input,LOCALE_ID} from '@angular/core';
import { ControlContainer,ControlValueAccessor,FormBuilder,FormGroup,FormGroupDirective, Validators} from '@angular/forms';
import { Address } from '@app/01_models/Address';
import { FormConroller } from '@app/core/classes/form-controller'; 
import { FormControllerService } from '@app/core/classes/form-controller-service';
import { AbstractControl } from '@app/core/components/controls/abstract-control';
import { DialogMode } from '@app/shared/constants';
@Component({
  selector: 'address-info-control',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressInfoControl extends FormConroller<Address> implements OnInit, ControlValueAccessor {

  readonly FIELD_STREET='street';
  readonly FIELD_HNO='houseNo';
  readonly FIELD_AREA='area';
  readonly FIELD_CITY='city';
  readonly FIELD_STATE='state';
  readonly FIELD_ZIP_CODE='zipCode';
  readonly FIELD_COUNTRY_ID='countryId';

  readonly formGroup = this.fb.group({
    [this.FIELD_STREET]: [null, [Validators.required]],
    [this.FIELD_HNO]: [null],
    [this.FIELD_AREA]: [null],
    [this.FIELD_CITY]: [null],
    [this.FIELD_STATE]: [null],  
    [this.FIELD_COUNTRY_ID]: [null], 
    [this.FIELD_ZIP_CODE]: [null, [Validators.required]]
  });

  constructor(private readonly fb: FormBuilder,
    private formControllerService: FormControllerService) {
    super("address");
  }
  writeValue(obj: any): void {
    console.log("Address value: "+obj);
  }
  registerOnChange(fn: any): void {
    console.log("on change");
    this.formGroup.valueChanges.subscribe(fn);
  }
  registerOnTouched(fn: any): void {

  }
  ngOnInit(): void {
    
  }
  public getFormGroup(): FormGroup {
    return this.formGroup;
  }
  public newObj(): Address {
    return new Address();
  }
  public mode(): DialogMode {
    return this.formControllerService.getMode();
  }
}
