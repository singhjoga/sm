import { AbstractResource } from '@app/01_models/AbstractResource';
import { AbstractDataSource } from "@app/core/classes/base-datasource";
import { ScreenController } from "@app/core/classes/screen-controller";
import { ResourceDialogComponent } from "@app/features/resource-dialog/resource-dialog.component";
import { DialogMode } from "@app/shared/constants";
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogUtil } from '../components/dialogs/dialog-service';
import { AppInjector } from '../injector.module';
export abstract class BaseUiService<T extends AbstractResource, LIST_TYPE> extends ScreenController{
    editDialog: any;
    viewDialog: any;
    public dialogUtil: DialogUtil;
    public ngDialogService: DialogService
    constructor(private objectType:string, editDialog: any, viewDialog: any, 
        public listDataSource: AbstractDataSource<LIST_TYPE>) {
        super(objectType);
        this.editDialog = editDialog;
        this.dialogUtil = AppInjector.get(DialogUtil);
        this.ngDialogService = AppInjector.get(DialogService);
        this.viewDialog=viewDialog;
    }
    getId(obj:T):string {
        return obj.id!;
    }

    openDetailsDialog(mode: DialogMode, id: string, data:any): DynamicDialogRef {
        return this.ngDialogService
            .open(ResourceDialogComponent, {
                width: '800px',
                header: this.getTitleOfDialog(mode, this.detailsTitleKey()),
                data: { mode: mode, id: id, component: this.editDialog, data: data}
            });
    }
    showAddDialog(data:any): DynamicDialogRef {
        return this.openDetailsDialog(DialogMode.Add,'',data);
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
    showEditDialog(obj:string|T, data:any): DynamicDialogRef {
        return this.openDetailsDialog(DialogMode.Edit, this.getIdOf(obj), data);
    }
    delete(id: string):Promise<any> {
        return this.listDataSource.delete(id);
    }

    showViewDialog(obj?:string|T): DynamicDialogRef {
        return this.ngDialogService
        .open(this.viewDialog, {
            width: '800px',
            header: this.getTitleOfDialog(DialogMode.View, this.detailsTitleKey()),
            data: { mode: DialogMode.View, id: this.getIdOf(obj)}
        })
    }
    detailsTitleKey(): string {
        return this.objectType+"Details";
    }
    listTitleKey(): string {
        return this.objectType+"List";
    }
    detailsData():any {
        return null;
    }

}