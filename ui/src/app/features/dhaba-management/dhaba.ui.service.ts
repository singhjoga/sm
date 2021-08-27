import { Injectable } from '@angular/core';
import { Dhaba } from '@app/01_models/Dhaba';
import { BaseUiService } from '@app/core/classes/base-ui-service';
import { Constants } from '@app/shared/constants';
import { DhabaBasicInfoComponent } from './details/basic-info/dhaba-basic-info.component';
import { DhabaDetailsComponent } from './details/dhaba-details.component';
import { DhabaDataSource } from './dhaba-datasource';
import { DhabaService } from './dhaba.api.service';
@Injectable({
  providedIn: 'root'
})
export class DhabaUiService extends BaseUiService<Dhaba, Dhaba>{
  constructor(service: DhabaService) {
    super(Constants.inst.OBJECT_TYPE_CUSTOMER, 
    DhabaBasicInfoComponent, DhabaDetailsComponent, new DhabaDataSource(service));
  }
}
