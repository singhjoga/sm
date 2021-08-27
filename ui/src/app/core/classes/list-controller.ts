import { ErrorResponse } from "@app/01_models/RestResponse";
import { AbstractDataSource } from "@app/core/classes/base-datasource";
import { ScreenController } from "@app/core/classes/screen-controller";
import { Constants, DialogMode } from "@app/shared/constants";
import { FilterMetadata } from "primeng/api";
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { DialogUtil } from '../components/dialogs/dialog-service';
import { AppInjector } from '../injector.module';
import { BaseUiService } from './base-ui-service';
export abstract class ListController<T, LIST_TYPE> extends ScreenController {
    selection: T[] = [];
    public dialogUtil: DialogUtil;
    globalFilter: string='';
    clearFilterEnabled=false;
    constructor(private uiService: BaseUiService<T, LIST_TYPE>) {
        super(uiService.listTitleKey());
        this.dialogUtil = AppInjector.get(DialogUtil);
    }
    onInit() {

    }
    onAfterViewInit(): void {
        this.dataSource().refresh().then(result => {
            
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
    refresh(id?:string) {
        this.dataSource().refresh().then(r => {
            if (id && this.getTable()) {
                this.setTableSelection(id);
            }
        });
    }
    setTableSelection(id: string) {
        let [rowIndex, obj] = this.dataSource().findInDataById(id);
        if (rowIndex == -1 || obj == null) {
            Error("Data not found for id: " + id);
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

    }
    onAdd() {
       this.afteAddUpdate(this.uiService.showAddDialog(this.detailsData()),DialogMode.Add);
    }
    private afteAddUpdate(dialogRef: DynamicDialogRef, mode: DialogMode, id?) {
        dialogRef.onClose
        .subscribe(result => {
            if (result != Constants.inst.DIALOG_CLOSE) {
                if (mode == DialogMode.Add) {
                    this.afterAdd(result);
                }else{
                    this.afterAdd(id!); 
                }
            }
        })
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
        this.afteAddUpdate(this.uiService.showEditDialog(id, this.detailsData()),DialogMode.Edit, id);
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
                            await this.dataSource().delete(id);
                            deletedCount++;
                            this.selection.splice(i, 1);
                        } catch (error: any) {
                            lastError = error;
                            break;
                        }
                    }
                    if (deletedCount > 0) {
                        this.dataSource().refresh();
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
    dataSource(): AbstractDataSource<LIST_TYPE> {
        return this.uiService.listDataSource;
    }
    view(id:string): DynamicDialogRef {
        return this.uiService.showViewDialog(id);
    }
    detailsData():any {
        return null;
    }
    afterAdd(id:string) {
        this.refresh(id);
    }
    afterEdit(id:string) {
        this.refresh(id);
    }
    
  clearFilters() {
    //  this.hasActiveFilter();
      this.getTable().clear();
      this.getTable().filterGlobal('', 'contains');
      this.globalFilter='';
    }
    inputElement(event:any):HTMLInputElement {
      return event.target as HTMLInputElement;
    }
    appliyGlobalFilter(event:any) {
      this.getTable().filterGlobal(event.target.value, 'contains');
    }
    hasActiveFilter():boolean {
      if (!this.getTable()) {
        return false;
      }
      if (this.globalFilter.trim() != '') {
        return true;
      }
      if (this.getTable().filters) {
        let tableFilters = this.getTable().filters;
        for (var field in tableFilters) {
          if (field=='global') {
            continue;
          }
          var filtersValue =tableFilters[field];
          let filters:FilterMetadata[];
          if (Array.isArray(filtersValue)) {
            filters=filtersValue;
          }else{
            filters = [filtersValue];
          }
          for (let filter of filters) {
            if (filter.value) {
              return true;
            }
          }
        }
      }
      return false;
    }
    onDataTableFilter() {
      this.clearFilterEnabled=this.hasActiveFilter();
    }
}