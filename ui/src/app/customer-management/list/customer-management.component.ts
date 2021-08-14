import { AfterViewInit, Component, ViewChild, ChangeDetectorRef, OnInit } from '@angular/core';
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
import { ConfirmationService } from 'primeng/api';
import { CustomerWithAddress } from '@app/01_models/CustomerWithAddress';
@Component({
  selector: 'app-customer-management',
  templateUrl: './customer-management.component.html',
  styleUrls: ['./customer-management.component.scss'],
  providers: [DialogService, ConfirmationService]
})
export class CustomerManagementComponent extends ListController<CustomerWithAddress> implements OnInit, AfterViewInit {

  displayedColumns = ['firstName', 'lastName', 'email', 'address', 'area', 'city', 'zipCode', 'contactInfo'];
  @ViewChild('dataTable') 
  dataTable!: Table;
  globalFilter: string='';
  clearFilterEnabled=false;
  constructor(private service: CustomerService,
    ngDialogService: DialogService) {
      super(Constants.inst.CUSTOMER_LIST, new CustomerDataSource(service), CustomerDetailsComponent);
  }
  ngOnInit() {
    super.onInit();
  }
  ngAfterViewInit(): void {
    super.onAfterViewInit();
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
  getTable(): Table {
    return this.dataTable;
  }
  getId(obj: CustomerWithAddress): string {
    return obj.customer?.id!;
  }

}
