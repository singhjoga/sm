import {Customer} from '@app/01_models/Customer';
import {CustomerService} from './customer.service';
import { AbstractDataSource } from '@app/core/classes/base-datasource';

export class CustomerDataSource extends AbstractDataSource<Customer>{
  constructor(service: CustomerService) {
    super(service);
  }
}
