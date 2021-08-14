import {Customer} from '@app/01_models/Customer';
import {CustomerService} from './customer.service';
import { AbstractDataSource } from '@app/core/classes/base-datasource';
import { CustomerWithAddress } from '@app/01_models/CustomerWithAddress';

export class CustomerDataSource extends AbstractDataSource<Customer>{
  constructor(private svc: CustomerService) {
    super(svc);
  }
  public findAll():Promise<CustomerWithAddress[]> {
    return this.svc.findAllWithAddress();
  }
}
