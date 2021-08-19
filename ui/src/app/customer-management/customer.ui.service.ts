import { Injectable } from '@angular/core';
import { Customer } from '@app/01_models/Customer';
import { CustomerWithAddress } from '@app/01_models/CustomerWithAddress';
import { BaseUiService } from '@app/core/classes/base-ui-service';
import { Constants } from '@app/shared/constants';
import { CustomerDataSource } from './customer-datasource';
import { CustomerService } from './customer.api.service';
import { CustomerBasicInfoComponent } from './details/basic-info/customer-basic-info.component';
import { CustomerDetailsComponent } from './details/customer-details.component';
@Injectable({
  providedIn: 'root'
})
export class CustomerUiService extends BaseUiService<Customer, CustomerWithAddress>{
  constructor(service: CustomerService) {
    super(Constants.inst.OBJECT_TYPE_CUSTOMER, 
    CustomerBasicInfoComponent, CustomerDetailsComponent, new CustomerDataSource(service));
  }
  getId(obj: Customer): string {
    return obj.id!;
  }

}
