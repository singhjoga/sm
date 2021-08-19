
import { Table } from 'primeng/table';
import { DialogUtil } from '../components/dialogs/dialog-service';
import { AppInjector } from '../injector.module';
import { ScreenController } from "@app/core/classes/screen-controller";
import { AbstractDataSource } from "@app/core/classes/base-datasource";
import { Constants, DialogMode } from "@app/shared/constants";
import { DialogService } from 'primeng/dynamicdialog';
import { ErrorResponse } from "@app/01_models/RestResponse";
import { ResourceDialogComponent } from "@app/customer-management/resource-dialog/resource-dialog.component";
export abstract class ListController<T> extends ScreenController {
    selection: T[] = [];
    dataSource: AbstractDataSource<T>;
    editDialog: any;
    viewDialog: any;
    public dialogUtil: DialogUtil;
    public ngDialogService: DialogService
    constructor(private objectType: string, dataSource: AbstractDataSource<T>,
         detailsDialog: any, viewDialog: any) {
        super(objectType+'List');
        this.dataSource = dataSource;
        this.editDialog = detailsDialog;
        this.dialogUtil = AppInjector.get(DialogUtil);
        this.ngDialogService = AppInjector.get(DialogService);
        this.viewDialog=viewDialog;
    }
    onInit() {

    }
    onAfterViewInit(): void {
        this.dataSource.refresh().then(result => {
            
        });
    }
    abstract getTable(): Table;
    abstract getId(obj:T):string;
    public askIsDeleteOK(itemCount?: number): Promise<any> {
        let msgText = this.getMessageText('delete', { count: itemCount });
        let titleText = this.getLabelText('confirmation');
        return this.dialogUtil.isYesNo(titleText, msgText);
    }
    public showDeleteSuccessful(itemCount?: number): Promise<any> {
        let msgText = this.getMessageText('delete-success', { count: itemCount });
        let titleText = this.getLabelText('information');
        return this.dialogUtil.showSuccessDialog(titleText, msgText);
    }
    public showDeleteFailed(error: String, successItemCount?: number): Promise<any> {
        let msgText = this.getMessageText('delete-failed', { error: error, count: successItemCount });
        let titleText = this.getLabelText('error');
        return this.dialogUtil.showErrorDialog(titleText, msgText);
    }
    openDetailsDialog(mode: DialogMode, id?: string) {
        this.ngDialogService
            .open(ResourceDialogComponent, {
                width: '800px',
                header: this.getTitleOfDialog(mode, this.detailsObject()),
                data: { mode: mode, id: id, component: this.editDialog, data: this.detailsData()}
            })
            .onClose
            .subscribe(result => {
                if (result != Constants.inst.DIALOG_CLOSE) {
                    this.refresh(mode, result, id);
                    if (mode == DialogMode.Add) {
                        this.afterAdd(result);
                    }else{
                        this.afterAdd(id!); 
                    }
                }
            })
    }
    refresh(mode: DialogMode, saveResult: any, id) {
        this.dataSource.refresh().then(r => {
            let objId = (mode == DialogMode.Add ? saveResult : id);
            let [rowIndex, obj] = this.dataSource.findInDataById(objId);
            if (rowIndex == -1 || obj == null) {
                Error("Data not found for id: " + saveResult);
            } else {
                setTimeout(() => {
                    let table = this.getTable();
                    let pageIndex = Math.trunc(rowIndex / table.rows);
                    let first = pageIndex * table.rows;
                    table.first = first;
                    this.selection = [];
                    this.selection.push(<T>obj!);
                });
            }
        });
    }
    onAdd() {
        var s = this.selection;
        this.openDetailsDialog(DialogMode.Add)
    }
    onEdit(obj?: T) {
        if (!obj && this.selection.length == 0) {
            return;
        }
        let editObj=obj;
        if (!editObj) {
            editObj = this.selection[0];
        }
        this.edit(this.getId(editObj));
    }
    edit(id:string) {
        this.openDetailsDialog(DialogMode.Edit, id);
    }
    onDelete(obj?: T) {
        let delObj:T[] = obj?[obj]:this.selection;
        this.askIsDeleteOK(delObj.length)
            .then(async result => {
                if (this.dialogUtil.isConfirmationResultYes(result)) {
                    let deletedCount: number = 0;
                    let lastError: ErrorResponse | null = null;
                    let selection = [...delObj];
                    var i = -1;
                    for (let obj of selection) {
                        i++;
                        const id = this.getId(obj);
                        try {
                            await this.dataSource.delete(id);
                            deletedCount++;
                            this.selection.splice(i, 1);
                        } catch (error: any) {
                            lastError = error;
                            break;
                        }
                    }
                    if (deletedCount > 0) {
                        this.dataSource.refresh();
                    }
                    if (lastError) {
                        this.showDeleteFailed(this.getApiErrorAsString(lastError).toString(), deletedCount);
                    } else {
                       this.showDeleteSuccessful(deletedCount).then(()=>{
                            console.log("After delete message");
                        })
                    }
                }
            });
    }
    onView(obj?: T) {
        if (!obj && this.selection.length == 0) {
            return;
        }
        let editObj=obj;
        if (!editObj) {
            editObj = this.selection[0];
        }
        this.view(this.getId(editObj));
    }
    view(id:string) {
        this.ngDialogService
        .open(this.viewDialog, {
            width: '800px',
            header: this.getTitleOfDialog(DialogMode.View, this.detailsObject()),
            data: { mode: DialogMode.View, id: id}
        })
    }
    private detailsObject(): string {
        return this.objectType+"Details";
    }
    detailsData():any {
        return null;
    }
    afterAdd(id:string) {
     //do something by overwriting it   
    }
    afterEdit(id:string) {
        //do something by overwriting it   
    }
}