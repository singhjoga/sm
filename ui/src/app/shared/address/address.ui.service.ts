import { Injectable } from '@angular/core';
import { Address } from '@app/01_models/Address';
import { BaseUiService } from '@app/core/classes/base-ui-service';
import { Constants } from '@app/shared/constants';
import { AddressDataSource } from './address-datasource';
import { AddressInfoControl } from './address-details/address.component';
import { AddressService } from './address.api.service';
@Injectable({
  providedIn: 'root'
})
export class AddressUiService extends BaseUiService<Address, Address>{
  constructor(service: AddressService) {
    super(Constants.inst.OBJECT_TYPE_ADDRESS, 
      AddressInfoControl, AddressInfoControl, 
      new AddressDataSource({service: service}));
  }
}
