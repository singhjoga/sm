import { Injectable } from '@angular/core';
import { Address } from '@app/01_models/Address';
import { Customer } from '@app/01_models/Customer';
import { CustomerWithAddress } from '@app/01_models/CustomerWithAddress';
import { CrudService } from '@app/core/services/crud-service';
import { HttpClientService } from "@app/core/services/http-client.service";
import { SnackbarService } from '@app/core/services/snackbar.service';
@Injectable({
  providedIn: 'root'
})
export class AddressService extends CrudService<Address, string>{

  constructor(http: HttpClientService, sb: SnackbarService,) {
    super(http, sb);
  }
  getApiUrl() {
    return this.getBaseApiUrl() + '/addresses';
  }
  async findAllForObj(objectType:string, objectId:string): Promise<Address[]> {
    var url = this.getApiUrl() + "?objectType="+objectType+"&objectId="+objectId;
    return new Promise((resolve, reject) => {
      this.http.get<Address[]>(url).subscribe(resp => {
        resolve(resp);
      },
      error => {
        this.snackBar.showError(error.message);
        reject(error);
      });
    });
  }
}
