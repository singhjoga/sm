import { AfterViewInit, Component, ViewChild, ChangeDetectorRef, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { CustomerDataSource } from '../customer-datasource';
import { Customer } from '@app/01_models/Customer';
import { CustomerService } from '../customer.service';
import { DialogMode } from '@app/shared/constants';
import { MatDialog } from '@angular/material/dialog';
import { CustomerDetailsComponent } from '../details/customer-details.component';
import { ListController } from '@app/core/classes/list-controller';
import { ErrorResponse } from '@app/01_models/RestResponse';

@Component({
  selector: 'app-customer-management',
  templateUrl: './customer-management.component.html',
  styleUrls: ['./customer-management.component.scss']
})
export class CustomerManagementComponent extends ListController implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Customer>;
  dataSource!: CustomerDataSource;
  displayedColumns = ['select', 'firstName', 'lastName', 'email', 'address', 'area', 'city', 'zipCode', 'contactInfo'];
  selection = new SelectionModel<Customer>(true, []);
  constructor(private service: CustomerService,
    private dialog: MatDialog) {
      super();
  }
  ngOnInit() {
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dataSource = new CustomerDataSource(this.service, this.paginator, this.sort);
      this.table.dataSource = this.dataSource;
    }, 100);
  }
  onAdd() {
    this.openDetailsDialog(DialogMode.Add)
  }
  onEdit() {
    if (this.selection.isEmpty()) {
      return;
    }
    let obj:Customer = this.selection.selected[0];
    this.openDetailsDialog(DialogMode.Edit, obj.id);
  }
  onDelete() {
    this.askIsDeleteOK(this.selection.selected.length)
      .then(async result => {
        if (this.dialogService.isConfirmationResultYes(result)) {
          let deletedCount:number=0;
          let lastError:ErrorResponse|null=null;
          let selection = [...this.selection.selected];
          for (let obj of selection) {
            const id = obj.id!;
            try {
              await this.service.delete(id);
              deletedCount++;
              this.selection.deselect(obj);
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
    this.dialog
      .open(CustomerDetailsComponent, {
        width: '800px',
        disableClose: true,
        data: { mode: mode, id: id }
      })
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.dataSource.refresh().then(r => {
            let [pageIndex, obj] = this.dataSource.findInDataById(result);
            if (pageIndex == -1 || obj == null) {
              Error("Data not found for id: " + result);
            }
            // this.paginator.pageIndex=pageIndex;
            this.paginator.pageIndex = pageIndex, // number of the page you want to jump.
              this.paginator.page.next({
                pageIndex: pageIndex,
                pageSize: this.paginator.pageSize,
                length: this.paginator.length
              });
            if (obj != null) {
              this.selection.select(obj);
            }
          });
        }
      })
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected == numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
}
