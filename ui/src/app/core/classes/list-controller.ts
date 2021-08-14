import { BaseConroller } from "./base-controller";
import { Table } from 'primeng/table';
import { DialogUtil } from '../components/dialogs/dialog-service';
import { AppInjector } from '../injector.module';
import { ScreenController } from "@app/core/classes/screen-controller";
import { AbstractResource } from "@app/01_models/AbstractResource";
import { AbstractDataSource } from "@app/core/classes/base-datasource";
import { Constants, DialogMode } from "@app/shared/constants";
import { DialogService } from 'primeng/dynamicdialog';
import { ErrorResponse } from "@app/01_models/RestResponse";
export abstract class ListController<T> extends ScreenController {
    selection: T[] = [];
    dataSource: AbstractDataSource<T>;
    detailsDialog: any;
    public dialogUtil: DialogUtil;
    public ngDialogService: DialogService
    constructor(screenName: string, dataSource: AbstractDataSource<T>, detailsDialog: any) {
        super(screenName);
        this.dataSource = dataSource;
        this.detailsDialog = detailsDialog;
        this.dialogUtil = AppInjector.get(DialogUtil);
        this.ngDialogService = AppInjector.get(DialogService);
    }
    onInit() {

    }
    onAfterViewInit(): void {

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
            .open(this.detailsDialog, {
                width: '800px',
                header: this.getTitleOfDialog(mode, Constants.inst.CUSTOMER_DETAILS),
                data: { mode: mode, id: id }
            })
            .onClose
            .subscribe(result => {
                if (result != Constants.inst.DIALOG_CLOSE) {
                    this.refresh(mode, result, id);
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
    onEdit() {
        if (this.selection.length == 0) {
            return;
        }
        let obj: T = this.selection[0];
        this.openDetailsDialog(DialogMode.Edit, this.getId(obj));
    }
    onDelete() {
        this.askIsDeleteOK(this.selection.length)
            .then(async result => {
                if (this.dialogUtil.isConfirmationResultYes(result)) {
                    let deletedCount: number = 0;
                    let lastError: ErrorResponse | null = null;
                    let selection = [...this.selection];
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
    onView(obj: T) {
        this.openDetailsDialog(DialogMode.View, this.getId(obj));
    }

}