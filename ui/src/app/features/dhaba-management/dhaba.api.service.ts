import { Injectable } from '@angular/core';
import { Dhaba } from '@app/01_models/Dhaba';
import { CrudService } from '@app/core/services/crud-service';
import { HttpClientService } from "@app/core/services/http-client.service";
import { SnackbarService } from '@app/core/services/snackbar.service';
@Injectable({
  providedIn: 'root'
})
export class DhabaService extends CrudService<Dhaba, string>{

  constructor(http: HttpClientService, sb: SnackbarService,) {
    super(http, sb);
  }
  getApiUrl() {
    return this.getBaseApiUrl() + '/dhabas';
  }
  async findAllWithAddress(): Promise<Dhaba[]> {
    var url = this.getApiUrl() + "/withaddress";
    return new Promise((resolve, reject) => {
      this.http.get<Dhaba[]>(url).subscribe(resp => {
        resolve(resp);
      },
      error => {
        this.snackBar.showError(error.message);
        reject(error);
      });
    });
  }
}
