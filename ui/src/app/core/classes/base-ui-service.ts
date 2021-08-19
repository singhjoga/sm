import { DialogUtil } from '../components/dialogs/dialog-service';
import { AppInjector } from '../injector.module';
import { ScreenController } from "@app/core/classes/screen-controller";
import { AbstractDataSource } from "@app/core/classes/base-datasource";
import { Constants, DialogMode } from "@app/shared/constants";
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ResourceDialogComponent } from "@app/customer-management/resource-dialog/resource-dialog.component";
export abstract class BaseUiService<T, LIST_TYPE> extends ScreenController{
    editDialog: any;
    viewDialog: any;
    public dialogUtil: DialogUtil;
    public ngDialogService: DialogService
    constructor(private objectType:string, detailsDialog: any, viewDialog: any, 
        public listDataSource: AbstractDataSource<LIST_TYPE>) {
        super(objectType);
        this.editDialog = detailsDialog;
        this.dialogUtil = AppInjector.get(DialogUtil);
        this.ngDialogService = AppInjector.get(DialogService);
        this.viewDialog=viewDialog;
    }
    abstract getId(obj:T):string;

    openDetailsDialog(mode: DialogMode, id?: string): DynamicDialogRef {
        return this.ngDialogService
            .open(ResourceDialogComponent, {
                width: '800px',
                header: this.getTitleOfDialog(mode, this.detailsTitleKey()),
                data: { mode: mode, id: id, component: this.editDialog, data: this.detailsData()}
            });
    }
    showAddDialog() {
        this.openDetailsDialog(DialogMode.Add);
    }
    getIdOf(obj?:string|T):string {
        var id;
        if (typeof obj === 'string') {
            id=obj;
        }else{
            id=this.getId(<T>obj);
        }
        return id;
    }
    showEditDialog(obj?:string|T) {
        this.openDetailsDialog(DialogMode.Edit, this.getIdOf());
    }
    delete(id: string):Promise<any> {
        return this.listDataSource.delete(id);
    }

    showViewDialog(obj?:string|T) {
        this.ngDialogService
        .open(this.viewDialog, {
            width: '800px',
            header: this.getTitleOfDialog(DialogMode.View, this.detailsTitleKey()),
            data: { mode: DialogMode.View, id: this.getIdOf(obj)}
        })
    }
    private detailsTitleKey(): string {
        return this.objectType+"Details";
    }
    private listTitleKey(): string {
        return this.objectType+"List";
    }
    detailsData():any {
        return null;
    }

}