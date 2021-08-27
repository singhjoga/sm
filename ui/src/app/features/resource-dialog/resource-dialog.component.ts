import { Component, ComponentFactoryResolver, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { ErrorResponse } from '@app/01_models/RestResponse';
import { FormControllerService } from '@app/core/classes/form-controller-service';
import { ScreenController } from '@app/core/classes/screen-controller';
import { ResourceControl } from '@app/core/components/controls/resource-control-interface';
import { AppInjector } from '@app/core/injector.module';
import { SnackbarService } from '@app/core/services/snackbar.service';
import { ResourceDialogDirective } from '@app/features/resource-dialog/resource-dialog-directive';
import { Constants, DialogMode } from '@app/shared/constants';
import { SystemService } from '@app/system/system-service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
@Component({
  selector: 'resource-dialog',
  templateUrl: './resource-dialog.component.html',
  styleUrls: ['./resource-dialog.component.scss'],
  viewProviders:[FormControllerService]
})
export class ResourceDialogComponent extends ScreenController implements OnInit{
  errorMessages: string[] = [];
  public snackbar: SnackbarService;

 // @ViewChild ("resourceControl") 
  resourceControl!: ResourceControl;
  @ViewChild(ResourceDialogDirective, {static: true}) resourceDialogDirective!: ResourceDialogDirective;
  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private dialogRef: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private systemService: SystemService,
    private controllerService: FormControllerService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    super("test");
    controllerService.setMode(config.data.mode);
    this.snackbar = AppInjector.get(SnackbarService);
  }

  ngOnInit(): void {
    this.loadComponent();
  }
  onSave() {
    //this.form2Model(this.obj);

    this.resourceControl.save().then(result => {
      this.snackbar.showSuccess(this.getMessageText('save-success'));
      this.dialogRef.close(result);
    },
      (error: ErrorResponse) => {
        this.errorMessages = this.getApiErrorAsString(error);
      }
    );
  }
  loadComponent() {
    const component = this.config.data.component;
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory<ResourceControl>(component);

    const viewContainerRef = this.resourceDialogDirective.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<ResourceControl>(componentFactory);
    this.resourceControl=componentRef.instance;
    this.resourceControl.id=this.config.data.id;
    this.resourceControl.mode =this.config.data.mode;
    this.resourceControl.data =this.config.data.data;
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
  getMode(): DialogMode {
    return this.config.data.mode;
  }
  getId(): string {
    return this.config.data.id;
  }
  onClose() {
    this.dialogRef.close(Constants.inst.DIALOG_CLOSE);
  }
}
