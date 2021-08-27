import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Address } from '@app/01_models/Address';
import { ListController } from '@app/core/classes/list-controller';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { AddressDataSource } from '../address-datasource';
import { AddressUiService } from '../address.ui.service';
@Component({
  selector: 'address-list-control',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.scss'],
  providers: [DialogService, ConfirmationService]
})
export class AddressListControl extends ListController<Address, Address> implements OnInit, AfterViewInit {
  @Input() parentObjectType!: string;
  @Input() parentObjectId!: string

  @ViewChild('dataTable') 
  dataTable!: Table;
  constructor(service: AddressUiService) {
      super(service);
  }
  ngOnInit() {
    super.onInit();
  }
  ngAfterViewInit(): void {
    var ds = (<AddressDataSource>this.dataSource());
    ds.addressDataConfig.parentObjectId=this.parentObjectId;
    ds.addressDataConfig.parentObjectType=this.parentObjectType;
    super.onAfterViewInit();
  }
 
  getTable(): Table {
    return this.dataTable;
  }
  getId(obj: Address): string {
    return obj.id!;
  }
  items():Address[] {
    return this.dataSource().items();
  }
  items1():Address[] {
    var list: Address[]=[];
    var a = new Address();
    a.area='area';
    a.city='city';
    a.houseNo='12';
    a.state='state';
    a.street='street';
    a.zipCode='zipCode';
    list.push(a);

    return list;
  }
  detailsData():any {
    return {parentObjectId: this.parentObjectId,
            parentObjectType: this.parentObjectType};
}
}
