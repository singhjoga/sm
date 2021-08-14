import { FormGroup, FormControl, NgForm, AbstractControl } from '@angular/forms';
import { AbstractResource } from '@app/01_models/AbstractResource';
import { ScreenController } from '@app/core/classes/screen-controller';
import { Constants, DialogMode } from '@app/shared/constants';
import { AbstractValidator } from '../components/validators/abstract-validator';
import { AppInjector } from '../injector.module';
export abstract class FormConroller<T extends AbstractResource> extends ScreenController {
  errorMessages: string[] = [];

  constructor(screenName: string) {
    super(screenName);
  }
  public abstract getFormGroup(): FormGroup;
  public abstract newObj(): T;
  public abstract mode(): DialogMode;
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
  protected init(obj: T) {
    if (this.mode() == DialogMode.Add) {
      this.model2Form(obj);
    } else {
      this.model2Form(obj);
    }
  }
  getValue(field: string): any {
    return this.getFormGroup().controls[field].value;
  }
  model2Form(obj: T) {
    Object.keys(this.getFormGroup().controls).forEach(key => {
      let value: any = obj[key];
      let control: AbstractControl = this.getFormGroup().controls[key];
      if (!(value == undefined || value == null)) {
        control.setValue(value);
      }
      if (this.mode() == DialogMode.View) {
        control.disable();
      }
    });
  }
  form2Model(obj: T) {
    Object.keys(this.getFormGroup().controls).forEach(key => {
      let control: AbstractControl = this.getFormGroup().controls[key];
      let value: any = control.value;
      if (value == '') {
        value = null;
      }
      if (typeof obj[key] != 'undefined') {
        obj[key] = value;
      }
    });
  }
  isEdit() {
    return this.mode() == DialogMode.Edit;
  }
  isAdd() {
    return this.mode() == DialogMode.Add;
  }
  isReadOnly() {
    return this.mode() == DialogMode.View;
  }
  modeText() {
    return DialogMode[this.mode()];
  }

}