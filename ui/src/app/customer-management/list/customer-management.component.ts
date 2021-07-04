import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { CustomerDataSource} from '../customer-datasource';
import {Customer} from '@app/01_models/Customer';
import {CustomerService} from '../customer.service';
import {DialogMode} from '@app/shared/constants';
import { MatDialog } from '@angular/material/dialog';
import {CustomerDetailsComponent} from '../details/customer-details.component';
@Component({
  selector: 'app-customer-management',
  templateUrl: './customer-management.component.html',
  styleUrls: ['./customer-management.component.scss']
})
export class CustomerManagementComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Customer>;
  dataSource: CustomerDataSource;
  displayedColumns = ['firstName','lastName','email','address','area','city','zipCode','contactInfo'];

  constructor(service: CustomerService, private dialog:MatDialog) {
    this.dataSource = new CustomerDataSource(service);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
  onAdd() {
    this.openDetailsDialog(DialogMode.Add)
  }
  openDetailsDialog(mode:DialogMode, id?:string){
    this.dialog
      .open(CustomerDetailsComponent, {
        width: '800px',
        disableClose: true,
        data: {mode: mode, id: id }
      })
      .afterClosed()
      .subscribe(result => {
        if (result) {

        }
      })
  }
}
