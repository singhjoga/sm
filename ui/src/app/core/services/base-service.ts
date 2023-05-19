import { catchError, Observable, throwError } from "rxjs";
import { interval, firstValueFrom } from 'rxjs';
import { HttpClientService } from "./http-client.service";
import { SnackbarService } from "./snackbar.service";
const loc = window.location
const API_URL = (loc.host === 'localhost:5000' ? 'http://localhost:8888' : loc.protocol + '//' + loc.host + ':' + loc.port) + '/api/v1'

export abstract class BaseService {
/*
    getBaseApiUrl(): string {
        return API_URL;
    }
    */
    snackBar: SnackbarService;
    constructor(sb: SnackbarService) {
        this.snackBar = sb;
    }
    exec<T>(observable: Observable<T>): Promise<T> {
        const source$ = observable.pipe(
            catchError(error => {
                this.snackBar.showError(error.message);
                return throwError(() => new Error(error));
            })
        );
        var result = firstValueFrom(source$);

        return result;      
    }
}