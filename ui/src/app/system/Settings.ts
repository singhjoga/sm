import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SystemProperties } from "@app/01_models/SystemProperties";
import { BaseService } from "@app/core/services/base-service";
import { SnackbarService } from "@app/core/services/snackbar.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SystemService } from "./system-service";

@Injectable()
export class Settings extends BaseService{
    systemProperties?: SystemProperties;
    constructor(private httpClient: HttpClient, sb: SnackbarService) {
        super(sb);
    }
    getBaseApiUrl(): string {
        return "http://localhost:8888/v1";
    }
    load():Observable<any> {
        console.log("Loading system settings...")
        const url = this.getBaseApiUrl() + '/properties';
        return this.httpClient.get<SystemProperties>(url)
            .pipe(
                map((resp:SystemProperties) => {
                    this.systemProperties=resp;
                    console.log("Loading system settings completed!")
                })
            );
    }
}
