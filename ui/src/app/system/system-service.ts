import { HttpClientService } from "@app/core/services/http-client.service";
import { SnackbarService } from '@app/core/services/snackbar.service';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseService } from "@app/core/services/base-service";
import { Language } from "@app/01_models/Language";
import { Injectable } from "@angular/core";
import { RefData } from "@app/01_models/RefData";
import { Country } from "@app/01_models/Country";
import { SystemProperties } from "@app/01_models/SystemProperties";

@Injectable()
export class SystemService extends BaseService {
    http: HttpClientService;
    snackBar: SnackbarService;
    constructor(http: HttpClientService, sb: SnackbarService) {
        super();
        this.http = http;
        this.snackBar = sb;
    }
    async getLangues(): Promise<Language[]> {
        const url = this.getBaseApiUrl() + '/system/languages';
        return this.http.get<Language[]>(url)
            .pipe(
                catchError(error => {
                    this.snackBar.showError(error.message);
                    return throwError(error);
                })
            ).toPromise();
    }
    async getRefData(type: string): Promise<RefData[]> {
        const url = this.getBaseApiUrl() + '/refdata/' + type;
        return this.http.get<RefData[]>(url)
            .pipe(
                catchError(error => {
                    this.snackBar.showError(error.message);
                    return throwError(error);
                })
            ).toPromise();
    }
    async getSexTypes(): Promise<RefData[]> {
        return this.getRefData('sex_type');
    }
    async getCountries(): Promise<Country[]> {
        const url = this.getBaseApiUrl() + '/system/countries';
        return this.http.get<Country[]>(url)
            .pipe(
                catchError(error => {
                    this.snackBar.showError(error.message);
                    return throwError(error);
                })
            ).toPromise();
    }
    async getCounty(id: string): Promise<Country> {
        const url = this.getBaseApiUrl() + '/system/countries/' + id;
        return this.http.get<Country>(url)
            .pipe(
                catchError(error => {
                    this.snackBar.showError(error.message);
                    return throwError(error);
                })
            ).toPromise();
    }
    async getSystemProperties(): Promise<SystemProperties> {
        const url = this.getBaseApiUrl() + '/system/properties';
        return this.http.get<SystemProperties>(url)
            .pipe(
                catchError(error => {
                    this.snackBar.showError(error.message);
                    return throwError(error);
                })
            ).toPromise();
    }
}