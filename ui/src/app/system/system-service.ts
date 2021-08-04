import { HttpClientService } from "@app/core/services/http-client.service";
import { SnackbarService } from '@app/core/services/snackbar.service';
import { throwError } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { BaseService } from "@app/core/services/base-service"; 
import { Language } from "@app/01_models/Language";
import { Injectable } from "@angular/core";

@Injectable()
export class SystemService extends BaseService{
    http: HttpClientService;
    snackBar: SnackbarService
    constructor(http: HttpClientService, sb: SnackbarService) {
        super();
        this.http=http;
        this.snackBar=sb;
    }
    async getLangues(): Promise<Language[]> {
        const url= this.getBaseApiUrl()+'/system/languages';
        return this.http.get<Language[]>(url)
        .pipe(
            catchError(error => {
                this.snackBar.showError(error.message);
                return throwError(error);
            })
        ).toPromise();
    }
}