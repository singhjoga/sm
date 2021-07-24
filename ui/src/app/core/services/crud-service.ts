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

    async add(obj:T): Promise<string> {
        return this.http.post<AddResponse>(this.getApiUrl(),obj)
        .pipe(
            map((resp: AddResponse) => resp.id),
            catchError(error => {
                this.snackBar.showError(error.message);
                return throwError(error);
            })
        ).toPromise();
    }
    async update(id:string, obj:T): Promise<any> {
        const url=this.getApiUrl()+"/"+id;
        return this.http.put<any>(url,obj)
        .pipe(
            catchError(error => {
                this.snackBar.showError(error.message);
                return throwError(error);
            })
        ).toPromise();
    }
    async delete(id:string): Promise<any> {
        const url=this.getApiUrl()+"/"+id;
        return this.http.delete(url)
        .pipe(
            catchError(error => {
                this.snackBar.showError(error.message);
                return throwError(error);
            })
        ).toPromise();
    }
    async findAll(): Promise<T[]> {
        return this.http.get<T[]>(this.getApiUrl())
        .pipe(
            catchError(error => {
                this.snackBar.showError(error.message);
                return throwError(error);
            })
        ).toPromise();
    }
    async findById(id: string): Promise<T> {
        let url=this.getApiUrl()+'/'+id
        return this.http.get<T>(url)
        .pipe(
            catchError(error => {
                this.snackBar.showError(error.message);
                return throwError(error);
            })
        ).toPromise();
    }

    public getHttp(): HttpClientService {
        return this.http;
    }
    public getSnackbar(): SnackbarService {
        return this.snackBar;
    }
}