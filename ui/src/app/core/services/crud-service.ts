import { AbstractResource } from "@app/01_models/AbstractResource";
import { HttpClientService } from "@app/core/services/http-client.service";
import { SnackbarService } from '@app/core/services/snackbar.service';
import {ErrorResponse, AddResponse} from '@app/01_models/RestResponse'
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {BaseService} from './base-service';
import { interval, firstValueFrom } from 'rxjs';
export abstract class CrudService< T extends AbstractResource, ID> extends BaseService{
    public http: HttpClientService;
    public snackBar: SnackbarService
    constructor(http: HttpClientService, sb: SnackbarService) {
        super(sb);
        this.http=http;
        this.snackBar=sb;
    }
    abstract getApiUrl();

    async add(obj:T): Promise<string> {

        const source$ = this.http.post<AddResponse>(this.getApiUrl(),obj)
        .pipe(
            map((resp: AddResponse) => resp.id),
            catchError(error => {
                this.snackBar.showError(error.message);
                return throwError(() => new Error(error));
            })
        );
        var result = firstValueFrom(source$);

        return result;
    }
    async update(id:string, obj:T): Promise<any> {
        const url=this.getApiUrl()+"/"+id;
        return this.exec(this.http.put<any>(url,obj));
    }
    async delete(id:string): Promise<any> {
        const url=this.getApiUrl()+"/"+id;
        return this.exec(this.http.delete(url));
    }
    async findAll(): Promise<T[]> {
        return this.exec(this.http.get<T[]>(this.getApiUrl()));
    }
    async findById(id: string): Promise<T> {
        let url=this.getApiUrl()+'/'+id
        return this.exec(this.http.get<T>(url));
    }

    public getHttp(): HttpClientService {
        return this.http;
    }
    public getSnackbar(): SnackbarService {
        return this.snackBar;
    }
}