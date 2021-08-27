import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Customer } from '@app/01_models/Customer';
import { Dhaba } from '@app/01_models/Dhaba';
import { FormConroller } from '@app/core/classes/form-controller';
import { ResourceControl } from '@app/core/components/controls/resource-control-interface';
import { CommonFields, DialogMode } from '@app/shared/constants';
import { Settings } from '@app/system/Settings';
import { SystemService } from '@app/system/system-service';
import { DhabaService } from '../../dhaba.api.service';
@Component({
  selector: 'dhaba-basic-info',
  templateUrl: './dhaba-basic-info.component.html',
  styleUrls: ['./dhaba-basic-info.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DhabaBasicInfoComponent),
      multi: true
    }
  ]
})
export class DhabaBasicInfoComponent extends FormConroller<Dhaba> implements OnInit, ControlValueAccessor, ResourceControl {
  @Input() id?: string | undefined;
  @Input() mode: DialogMode=DialogMode.View;

  readonly FIELD_NAME = 'name';
  readonly FIELD_TAXNO = 'taxNo';
  readonly FIELD_EMAIL = 'orderEmail';
  readonly FIELD_PHONE = 'orderPhone';
  readonly FIELD_DELIVERY_SELF = 'deliverySelf';
  readonly FIELD_DELIVERY_PICKUP = 'deliveryPickup';
  readonly FIELD_DELIVERY_DINEIN = 'deliveryDineIn';
  readonly FIELD_DELIVERY_3RDPARTY = 'delivery3rdParty';
  readonly FIELD_IS_DISABLED = CommonFields.IsDisabled;
  readonly formGroup = this.fb.group({
    [this.FIELD_NAME]: [null, [Validators.required]],
    [this.FIELD_TAXNO]: [null],
    [this.FIELD_EMAIL]: [null, [Validators.email, Validators.required]],
    [this.FIELD_PHONE]: [null],
    [this.FIELD_DELIVERY_SELF]: [false],
    [this.FIELD_DELIVERY_PICKUP]: [false],
    [this.FIELD_DELIVERY_DINEIN]: [false],
    [this.FIELD_DELIVERY_3RDPARTY]: [false],
    [this.FIELD_IS_DISABLED]: [false],
  });
  obj!: Dhaba;
  _onChangeCallbak = (_: any) => {};
  constructor(
    private fb: FormBuilder,
    private systemService: SystemService,
    service: DhabaService,
    public settings: Settings
  ) {
    super("dhaba-basic-info", service);
  }


  ngOnInit(): void {
    if (this._onChangeCallbak) {
      this.formGroup.valueChanges.subscribe(change => {
        this._onChangeCallbak(change);
      })
    }

    super.init();
    if (this.getMode() == DialogMode.Add) {
      this.setDisabled(this.FIELD_IS_DISABLED,true);
    }
  }
  public getFormGroup(): FormGroup {
    return this.formGroup;
  }
  public newObj(): Dhaba {
    return new Dhaba();
  }
  public getMode(): DialogMode {
    return this.mode;
  }
  public getId(): string {
    return this.id!;
  }
  writeValue(obj: any): void {
    if (obj) {
      if (!(obj instanceof Customer)) {
       // throw new Error("Only Customer type is expected");
      }
      this.obj=obj;
      this.model2Form(obj);
    }
  }
  readValue(): Dhaba {
    if (this.obj) {
      this.obj= this.newObj();
    }
    this.form2Model(this.obj);
    return this.obj;
  }
  registerOnChange(fn: any): void {
    this._onChangeCallbak=fn;
  }
  registerOnTouched(fn: any): void {

  }
}
