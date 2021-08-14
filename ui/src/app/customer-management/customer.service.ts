import { Injectable } from '@angular/core';
import { Customer } from '@app/01_models/Customer';
import { CustomerWithAddress } from '@app/01_models/CustomerWithAddress';
import { CrudService } from '@app/core/services/crud-service';
import { HttpClientService } from "@app/core/services/http-client.service";
import { SnackbarService } from '@app/core/services/snackbar.service';
@Injectable({
  providedIn: 'root'
})
export class CustomerService extends CrudService<Customer, string>{

  constructor(http: HttpClientService, sb: SnackbarService,) {
    super(http, sb);
  }
  getApiUrl() {
    return this.getBaseApiUrl() + '/customers';
  }
  async findAllWithAddress(): Promise<CustomerWithAddress[]> {
    var url = this.getApiUrl() + "/withaddress";
    return new Promise((resolve, reject) => {
      this.http.get<CustomerWithAddress[]>(url).subscribe(resp => {
        resolve(resp);
      },
      error => {
        this.snackBar.showError(error.message);
        reject(error);
      });
    });
  }
}
