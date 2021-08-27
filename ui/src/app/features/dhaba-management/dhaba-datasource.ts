import { Dhaba } from '@app/01_models/Dhaba';
import { AbstractDataSource } from '@app/core/classes/base-datasource';
import { DhabaService } from './dhaba.api.service';

export class DhabaDataSource extends AbstractDataSource<Dhaba>{

  constructor(private svc: DhabaService) {
    super({service:svc});
  }

  getId(obj: Dhaba): string {
    return obj.id!;
  }
  public findAll():Promise<Dhaba[]> {
    return this.svc.findAllWithAddress();
  }
}
