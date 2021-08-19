import { AbstractResource } from '@app/01_models/AbstractResource';
import { Constants, DialogMode } from '@app/shared/constants';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { CrudService } from '@app/core/services/crud-service';
import { SnackbarService } from '@app/core/services/snackbar.service';
import { AppInjector } from '../injector.module';
import { ErrorResponse } from '@app/01_models/RestResponse';
import { FormConroller } from '@app/core/classes/form-controller';
export abstract class FormDialogConroller<T extends AbstractResource> extends FormConroller<T>{
  errorMessages: string[] = [];
  public snackbar: SnackbarService;
  constructor(screenName: string,
    private config: DynamicDialogConfig,
    public service: CrudService<T, string>,
    public dialogRef: DynamicDialogRef) {
    super(screenName, service);
    this.snackbar = AppInjector.get(SnackbarService);
  }

  onClose() {
    this.dialogRef.close(Constants.inst.DIALOG_CLOSE);
  }
  id(): string {
    return this.config.data.id;
  }
  public getMode(): DialogMode {
    return this.config.data.mode;
  }
  public getId(): string {
    return this.config.data.id;
  }
  onSave() {
    this.save().then(result => {
      this.snackbar.showSuccess(this.getMessageText('save-success'));
      this.dialogRef.close(result);
    },
      (error: ErrorResponse) => {
        this.errorMessages = this.getApiErrorAsString(error);
      }
    );
  }
}