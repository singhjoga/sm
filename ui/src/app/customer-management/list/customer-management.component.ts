import { AfterViewInit, Component, ViewChild, ChangeDetectorRef, OnInit } from '@angular/core';

import { SelectionModel } from '@angular/cdk/collections';
import { CustomerDataSource } from '../customer-datasource';
import { Customer } from '@app/01_models/Customer';
import { CustomerService } from '../customer.service';
import { Constants, DialogMode } from '@app/shared/constants';
import { DialogService} from 'primeng/dynamicdialog';
import { CustomerDetailsComponent } from '../details/customer-details.component';
import { ListController } from '@app/core/classes/list-controller';
import { ErrorResponse } from '@app/01_models/RestResponse';
import { Table } from 'primeng/table';
import { FilterMetadata } from 'primeng/api';
import { FormControl } from '@angular/forms';
import { Identifiers } from '@angular/compiler';
@Component({
  selector: 'app-customer-management',
  templateUrl: './customer-management.component.html',
  styleUrls: ['./customer-management.component.scss'],
  providers: [DialogService]
})
export class CustomerManagementComponent extends ListController implements OnInit, AfterViewInit {
  dataSource!: CustomerDataSource;
  displayedColumns = ['firstName', 'lastName', 'email', 'address', 'area', 'city', 'zipCode', 'contactInfo'];
  selection:Customer[] = [];
  
  @ViewChild('dataTable') 
  dataTable!: Table;
  globalFilter: string='';
  clearFilterEnabled=false;
  constructor(private service: CustomerService,
    public ngDialogService: DialogService) {
      super(Constants.inst.CUSTOMER_LIST);
      this.dataSource = new CustomerDataSource(this.service);
  }
  ngOnInit() {
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
     // this.dataSource = new CustomerDataSource(this.service);
    }, 100);
  }
  onAdd() {
    var s = this.selection;
    this.openDetailsDialog(DialogMode.Add)
  }
  onEdit() {
    if (this.selection.length==0) {
      return;
    }
    let obj:Customer = this.selection[0];
    this.openDetailsDialog(DialogMode.Edit, obj.id);
  }
  onDelete() {
    this.askIsDeleteOK(this.selection.length)
      .then(async result => {
        if (this.dialogService.isConfirmationResultYes(result)) {
          let deletedCount:number=0;
          let lastError:ErrorResponse|null=null;
          let selection = [...this.selection];
          var i=-1;
          for (let obj of selection) {
            i++;
            const id = obj.id!;
            try {
              await this.service.delete(id);
              deletedCount++;
              this.selection.splice(i,1);
            }catch (error:any) {
              lastError=error;
              break;
            }
          }
          if (deletedCount > 0) {
            this.dataSource.refresh();
          }
          if (lastError) {
            this.showDeleteFailed(this.getApiErrorAsString(lastError).toString(),deletedCount);
          }else{
            this.showDeleteSuccessful(deletedCount);
          }
        }
      });
  }
  onView(obj:Customer) {
    this.openDetailsDialog(DialogMode.View, obj.id)
  }
  openDetailsDialog(mode: DialogMode, id?: string) {
    this.ngDialogService
      .open(CustomerDetailsComponent, {
        width: '800px',
        header: this.getTitleOfDialog(mode, Constants.inst.CUSTOMER_DETAILS),
        data: { mode: mode, id: id }
      })
      .onClose
      .subscribe(result => {
          this.dataSource.refresh().then(r => {
            let objId = (mode == DialogMode.Add?result:id);
            let [pageIndex, obj] = this.dataSource.findInDataById(objId);
            if (pageIndex == -1 || obj == null) {
              Error("Data not found for id: " + result);
            }
            // this.paginator.pageIndex=pageIndex;
            /*
            this.paginator.pageIndex = pageIndex, // number of the page you want to jump.
              this.paginator.page.next({
                pageIndex: pageIndex,
                pageSize: this.paginator.pageSize,
                length: this.paginator.length
              });
              */
            if (obj != null) {
              this.selection.push(obj);
            }
          });
      })
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.length;
    const numRows = this.dataSource.allData.length;
    return numSelected == numRows;
  }

  clearFilters() {
  //  this.hasActiveFilter();
    this.dataTable.clear();
    this.dataTable.filterGlobal('', 'contains');
    this.globalFilter='';
  }
  inputElement(event:any):HTMLInputElement {
    return event.target as HTMLInputElement;
  }
  appliyGlobalFilter(event:any) {
    this.dataTable.filterGlobal(event.target.value, 'contains');
  }
  hasActiveFilter():boolean {
    if (!this.dataTable) {
      return false;
    }
    if (this.globalFilter.trim() != '') {
      return true;
    }
    if (this.dataTable.filters) {
      let tableFilters = this.dataTable.filters;
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
