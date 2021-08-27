import { OnInit, Component, Input,LOCALE_ID} from '@angular/core';
import { ControlContainer,ControlValueAccessor,FormBuilder,FormGroup,FormGroupDirective, Validators} from '@angular/forms';
import { Address } from '@app/01_models/Address';
import { FormConroller } from '@app/core/classes/form-controller'; 
import { FormControllerService } from '@app/core/classes/form-controller-service';
import { AbstractControl } from '@app/core/components/controls/abstract-control';
import { ResourceControl } from '@app/core/components/controls/resource-control-interface';
import { AddressService } from '@app/shared/address/address.api.service';
import { Constants, DialogMode } from '@app/shared/constants';
@Component({
  selector: 'address-info-control',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressInfoControl extends FormConroller<Address> implements OnInit, ControlValueAccessor, ResourceControl {
  @Input() id?: string | undefined;
  @Input() mode!: DialogMode;
  @Input() data?: any;

  readonly FIELD_STREET='street';
  readonly FIELD_HNO='houseNo';
  readonly FIELD_AREA='area';
  readonly FIELD_CITY='city';
  readonly FIELD_STATE='state';
  readonly FIELD_ZIP_CODE='zipCode';
  readonly FIELD_COUNTRY_ID='countryId';
  readonly FIELD_IS_DEFAULT='isDefault';
  readonly formGroup = this.fb.group({
    [this.FIELD_STREET]: [null, [Validators.required]],
    [this.FIELD_HNO]: [null],
    [this.FIELD_AREA]: [null],
    [this.FIELD_CITY]: [null],
    [this.FIELD_STATE]: [null],  
    [this.FIELD_COUNTRY_ID]: [null], 
    [this.FIELD_ZIP_CODE]: [null, [Validators.required]],
    [this.FIELD_IS_DEFAULT]: [false],
  });

  constructor(private readonly fb: FormBuilder,
    private formControllerService: FormControllerService,
    service: AddressService) {
    super(Constants.inst.ADDRESS_LIST, service);
  }
  writeValue(obj: any): void {

  }
  registerOnChange(fn: any): void {
    this.formGroup.valueChanges.subscribe(fn);
  }
  registerOnTouched(fn: any): void {

  }
  ngOnInit(): void {
    super.init();
  }
  public getFormGroup(): FormGroup {
    return this.formGroup;
  }
  public newObj(): Address {
    var obj = new Address();
    obj.objectType=this.data.parentObjectType;
    obj.objectId=this.data.parentObjectId;
    return obj;
  }
  public getMode(): DialogMode {
    return this.mode;
  }
  public getId(): string {
   return this.id!;
  }

}
