import { FormGroup, FormControl, NgForm, AbstractControl } from '@angular/forms';
import { AbstractResource } from '@app/01_models/AbstractResource';
import { ScreenController } from '@app/core/classes/screen-controller';
import { CrudService } from '@app/core/services/crud-service';
import { Constants, DialogMode } from '@app/shared/constants';
import { AbstractValidator } from '../components/validators/abstract-validator';
import { AppInjector } from '../injector.module';
export abstract class FormConroller<T extends AbstractResource> extends ScreenController {
  errorMessages: string[] = [];
  public obj!: T;
  constructor(screenName: string, public service: CrudService<T, string>) {
    super(screenName);
  }
  public abstract getFormGroup(): FormGroup;
  public abstract newObj(): T;
  public abstract getMode(): DialogMode;
  public abstract getId(): string;
  protected createFormGroup(controls: Object) {
    let config = {};
    for (let key in controls) {
      config[key] = this.createFormControl(key, controls);
    }
    return new FormGroup(config);
  }
  protected createFormControl(key: string, controls: Object): FormControl {
    let values = controls[key];
    let state: any;
    let validators: AbstractValidator[] | any;
    if (values && values.length) {
      if (values.length > 0) {
        state = values[0];
      }
      if (values.length > 1) {
        validators = values[1];
      }
    }
    return new FormControl(state, validators);
  }
  protected init() {
    if (this.getMode() == DialogMode.Add) {
      this.obj = this.newObj();
      this.model2Form(this.obj);
    } else {
      this.service.findById(this.getId()).then(resp => {
        this.obj = resp;
        this.model2Form(this.obj);
      });
    }
  }

  getValue(field: string): any {
    return this.getFormGroup().controls[field].value;
  }
  setValue(field: string, value:any): void {
    return this.getFormGroup().controls[field].setValue(value);
  }
  setDisabled(field: string, isDisabled:boolean): void {
    if (isDisabled) {
      return this.getFormGroup().controls[field].disable();
    }else{
      return this.getFormGroup().controls[field].enable();
    }

  }
  model2Form(obj: T) {
    Object.keys(this.getFormGroup().controls).forEach(key => {
      let value: any = obj[key];
      let control: AbstractControl = this.getFormGroup().controls[key];
      if (!(value == undefined || value == null)) {
        if (key.includes('Date')) {
          control.setValue(new Date(value));
        }else {
          control.setValue(value);
        }

      }
      if (this.getMode() == DialogMode.View) {
        control.disable();
      }
    });
  }
  form2Model(obj: T) {
    Object.keys(this.getFormGroup().controls).forEach(key => {
      let control: AbstractControl = this.getFormGroup().controls[key];
      let value: any = control.value;
      if (value === '') {
        value = null;
      }
      obj[key] = value;
    });
  }
  save(): Promise<any> {
    this.form2Model(this.obj);
    if (this.getMode() == DialogMode.Add) {
      return this.service.add(this.obj);
    } else {
      return this.service.update(this.getId(), this.obj);
    }
  }

  isEdit() {
    return this.getMode() == DialogMode.Edit;
  }
  isAdd() {
    return this.getMode() == DialogMode.Add;
  }
  isReadOnly() {
    return this.getMode() == DialogMode.View;
  }
  modeText() {
    return DialogMode[this.getMode()];
  }

}