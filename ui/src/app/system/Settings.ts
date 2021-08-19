import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SystemProperties } from "@app/01_models/SystemProperties";
import { BaseService } from "@app/core/services/base-service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SystemService } from "./system-service";

@Injectable()
export class Settings extends BaseService{
    systemProperties?: SystemProperties;
    constructor(private httpClient: HttpClient) {
        super();
    }
    load():Observable<any> {
        console.log("Loading system settings...")
        const url = this.getBaseApiUrl() + '/system/properties';
        return this.httpClient.get<SystemProperties>(url)
            .pipe(
                map((resp:SystemProperties) => {
                    this.systemProperties=resp;
                    console.log("Loading system settings completed!")
                })
            );
    }
}
