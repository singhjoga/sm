import { FormGroup, FormControl, NgForm, AbstractControl } from '@angular/forms';
import { AbstractResource } from '@app/01_models/AbstractResource';
import { ScreenController } from '@app/core/classes/screen-controller';
import { Constants, DialogMode } from '@app/shared/constants';
import { AbstractValidator } from '../components/validators/abstract-validator';
import {DynamicDialogRef, DynamicDialogConfig} from 'primeng/dynamicdialog';
import { CrudService } from '@app/core/services/crud-service';
import { SnackbarService } from '@app/core/services/snackbar.service';
import { AppInjector } from '../injector.module';
import { ErrorResponse } from '@app/01_models/RestResponse';
export abstract class FormConroller<T extends AbstractResource> extends ScreenController{
  public obj!: T;
  errorMessages:string[]=[];
  private snackbar: SnackbarService;
    constructor(screenName:string, 
        private config: DynamicDialogConfig,
        private service: CrudService<T, string>,
        public dialogRef: DynamicDialogRef) {
        super(screenName);
        this.snackbar = AppInjector.get(SnackbarService);
    }
    public abstract getFormGroup():FormGroup;
    public abstract newObj():T;

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
        if (this.mode()==DialogMode.Add) {
            this.obj = this.newObj();
            this.model2Form(this.obj);
          }else{
            this.service.findById(this.id()).then(resp => {
              this.obj=resp;
              this.model2Form(this.obj);
            });
          }
    }
    getValue(field:string): any {
        return this.getFormGroup().controls[field].value;
    }
    model2Form(obj:T) {
        Object.keys(this.getFormGroup().controls).forEach(key => {
          let value:any = obj[key];
          let control:AbstractControl  = this.getFormGroup().controls[key];
          if (!(value == undefined || value==null)) {
            control.setValue(value);
          }
          if (this.mode() == DialogMode.View) {
            control.disable();
          }
      });
      }
      form2Model(obj:T) {
        Object.keys(this.getFormGroup().controls).forEach(key => {
          let control:AbstractControl  = this.getFormGroup().controls[key];
          let value:any = control.value;
          if (value =='') {
            value=null;
          }
          if (typeof obj[key] != 'undefined') {
            obj[key]=value;
          }
        });
      }
      onClose() {
        this.dialogRef.close(Constants.inst.DIALOG_CLOSE);
      }
      onSave() {
        this.form2Model(this.obj);
        this.save().then(result => {
          this.snackbar.showSuccess(this.getMessageText('save-success'));
          this.dialogRef.close(result);
        },
        (error: ErrorResponse) => {
          this.errorMessages=this.getApiErrorAsString(error);
        }
        );
      }
      save():Promise<any> {
        if (this.mode()==DialogMode.Add) {
          return this.service.add(this.obj);
        }else{
          return this.service.update(this.id(), this.obj);
        }
      }
    
      mode(): DialogMode {
        return this.config.data.mode;
      }
      id():string {
        return this.config.data.id;
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