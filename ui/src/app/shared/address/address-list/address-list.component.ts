import { AfterViewInit, Component, ViewChild, ChangeDetectorRef, OnInit, Input } from '@angular/core';
import { AddressDataSource, AddressDataSourceConfig} from '../address-datasource';
import { Constants, DialogMode } from '@app/shared/constants';
import { DialogService} from 'primeng/dynamicdialog';
import { ListController } from '@app/core/classes/list-controller';
import { Table } from 'primeng/table';
import { ConfirmationService } from 'primeng/api';
import { Address } from '@app/01_models/Address';
import { AddressService } from '@app/shared/address/address.service';
import { AddressInfoControl } from '@app/shared/address/address-details/address.component';
@Component({
  selector: 'address-list-control',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.scss'],
  providers: [DialogService, ConfirmationService]
})
export class AddressListControl extends ListController<Address> implements OnInit, AfterViewInit {
  @Input() parentObjectType!: string;
  @Input() parentObjectId!: string

  @ViewChild('dataTable') 
  dataTable!: Table;
  constructor(service: AddressService) {
      super(Constants.inst.OBJECT_TYPE_ADDRESS, new AddressDataSource({service: service}), 
      AddressInfoControl, null);
  }
  ngOnInit() {
    super.onInit();
  }
  ngAfterViewInit(): void {
    var ds = (<AddressDataSource>this.dataSource);
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
    return this.dataSource.items();
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
