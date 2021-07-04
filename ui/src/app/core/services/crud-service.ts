import { AbstractResource } from "@app/01_models/AbstractResource";
import { HttpClientService } from "@app/core/services/http-client.service";
import { SnackbarService } from '@app/core/services/snackbar.service';
import {ErrorResponse, AddResponse} from '@app/01_models/RestResponse'
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {BaseService} from './base-service';
export abstract class CrudService< T extends AbstractResource, ID> extends BaseService{
    http: HttpClientService;
    snackBar: SnackbarService
    constructor(http: HttpClientService, sb: SnackbarService) {
        super();
        this.http=http;
        this.snackBar=sb;
    }
    abstract getApiUrl();

    add(obj:T): Observable<string> {
        return this.http.post<AddResponse>(this.getApiUrl(),obj)
        .pipe(
            map((resp: AddResponse) => resp.id),
            catchError(error => {
                this.snackBar.openSnackBar(error.message, '', 'error-snackbar');
                return throwError(error);
            })
        );
    }
    findAll(): Observable<T[]> {
        return this.http.get<T[]>(this.getApiUrl())
        .pipe(
            catchError(error => {
                this.snackBar.openSnackBar(error.message, '', 'error-snackbar');
                return throwError(error);
            })
        );
    }
    findById(id: string): Observable<T> {
        let url=this.getApiUrl()+'/'+id
        return this.http.get<T>(url)
        .pipe(
            catchError(error => {
                this.snackBar.openSnackBar(error.message, '', 'error-snackbar');
                return throwError(error);
            })
        );
    }

    public getHttp(): HttpClientService {
        return this.http;
    }
    public getSnackbar(): SnackbarService {
        return this.snackBar;
    }
}