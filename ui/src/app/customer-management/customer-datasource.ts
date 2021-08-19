import {Customer} from '@app/01_models/Customer';
import {CustomerService} from './customer.api.service';
import { AbstractDataSource } from '@app/core/classes/base-datasource';
import { CustomerWithAddress } from '@app/01_models/CustomerWithAddress';

export class CustomerDataSource extends AbstractDataSource<CustomerWithAddress>{

  constructor(private svc: CustomerService) {
    super({service:svc});
  }
  public findAll():Promise<CustomerWithAddress[]> {
    return this.svc.findAllWithAddress();
  }
  getId(obj: CustomerWithAddress): string {
    return obj.customer?.id!;
  }
}
