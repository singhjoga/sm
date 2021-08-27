import { AbstractDataSource, DataSourceConfig } from '@app/core/classes/base-datasource';
import { Address } from '@app/01_models/Address';
import { AddressService } from '@app/shared/address/address.api.service';

export class AddressDataSource extends AbstractDataSource<Address>{
  constructor(public addressDataConfig: AddressDataSourceConfig) {
    super(addressDataConfig);
  }
  public findAll(): Promise<Address[]> {
    return this.addressService().findAllForObj(this.addressDataConfig.parentObjectType!, this.addressDataConfig.parentObjectId!);
  }
  getId(obj: Address): string {
    return obj.id!;
  }
  private addressService(): AddressService {
    return <AddressService>this.addressDataConfig.service;
  }
}

export interface AddressDataSourceConfig extends DataSourceConfig<Address> {
  parentObjectType?: string;
  parentObjectId?: string
}