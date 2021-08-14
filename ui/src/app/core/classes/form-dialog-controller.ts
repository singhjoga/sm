import { AbstractResource } from '@app/01_models/AbstractResource';
import { Constants, DialogMode } from '@app/shared/constants';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { CrudService } from '@app/core/services/crud-service';
import { SnackbarService } from '@app/core/services/snackbar.service';
import { AppInjector } from '../injector.module';
import { ErrorResponse } from '@app/01_models/RestResponse';
import { FormConroller } from '@app/core/classes/form-controller';
export abstract class FormDialogConroller<T extends AbstractResource> extends FormConroller<T>{
  public obj!: T;
  errorMessages: string[] = [];
  public snackbar: SnackbarService;
  constructor(screenName: string,
    private config: DynamicDialogConfig,
    public service: CrudService<T, string>,
    public dialogRef: DynamicDialogRef) {
    super(screenName);
    this.snackbar = AppInjector.get(SnackbarService);
  }

  protected init() {
    if (this.mode() == DialogMode.Add) {
      this.obj = this.newObj();
      this.model2Form(this.obj);
    } else {
      this.service.findById(this.id()).then(resp => {
        this.obj = resp;
        this.model2Form(this.obj);
      });
    }
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
        this.errorMessages = this.getApiErrorAsString(error);
      }
    );
  }
  save(): Promise<any> {
    if (this.mode() == DialogMode.Add) {
      return this.service.add(this.obj);
    } else {
      return this.service.update(this.id(), this.obj);
    }
  }
  id(): string {
    return this.config.data.id;
  }
  public mode(): DialogMode {
    return this.config.data.mode;
  }
}