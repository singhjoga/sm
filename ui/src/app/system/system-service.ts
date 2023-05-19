import { HttpClientService } from "@app/core/services/http-client.service";
import { SnackbarService } from '@app/core/services/snackbar.service';
import { Observable, throwError } from 'rxjs';
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
        super(sb);
        this.http = http;
        this.snackBar = sb;
    }
    getBaseApiUrl(): string {
        return "http://localhost:8888/v1";
    }
    async getLangues(): Promise<Language[]> {
        const url = this.getBaseApiUrl() + '/languages';
        return this.exec(this.http.get<Language[]>(url));
    }
    async getRefData(type: string): Promise<RefData[]> {
        const url = this.getBaseApiUrl() + '/refdata/' + type;
        return this.exec(this.http.get<RefData[]>(url));
    }
    async getSexTypes(): Promise<RefData[]> {
        return this.getRefData('sex_type');
    }
    async getCountries(): Promise<Country[]> {
        const url = this.getBaseApiUrl() + '/countries';
        return this.exec(this.http.get<Country[]>(url));
    }
    async getCounty(id: string): Promise<Country> {
        const url = this.getBaseApiUrl() + '/countries/' + id;
        return this.exec(this.http.get<Country>(url));
    }
    async getSystemProperties(): Promise<SystemProperties> {
        const url = this.getBaseApiUrl() + '/properties';
        return this.exec(this.http.get<SystemProperties>(url));
    }
}