import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UtilsService } from './utils.service';
import {ErrorResponse} from '@app/01_models/RestResponse'
@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  constructor(
    private httpClient: HttpClient,
    private utils: UtilsService
  ) { }

  public post<T>(url: string, body: any, headers?: HttpHeaders): Observable<T>{
    return this.httpClient.post<T>(url, body, { headers })
      .pipe(catchError(err => {
        let errorObj = this.getHTTPErrorMessage(err);
        return throwError(errorObj);
      }),
        map((_: T) => _)
      );
  }

  public get = <T>(url: string, headers?: HttpHeaders): Observable<T> => {
    return this.httpClient.get<T>(url, { headers })
      .pipe(catchError(err => {
        let errorObj = this.getHTTPErrorMessage(err);
        return throwError(errorObj);
      }),
        map((_: T) => _)
      );
  }

  public put = <T>(url: string, body: any, headers?: HttpHeaders): any => {
    return this.httpClient.post<T>(url, body, { headers })
      .pipe(
        catchError(err => {
            let errorObj = this.getHTTPErrorMessage(err);
            return throwError(errorObj);
          }),
        map((_: T) => _)
      );
  }

  public delete = (url, headers?: HttpHeaders): Observable<any> => {
    return this.httpClient.delete(url, { headers })
      .pipe(
        catchError(err => {
            let errorObj = this.getHTTPErrorMessage(err);
            return throwError(errorObj);
          }),
        map((_: any) => _)
      );
  }

  downloadFile(data, fileName: string) {
    const blob = new Blob([data], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${fileName}.csv`;
    a.click();
  }

  public getWithResponseType = <T>(url: string, headers?: HttpHeaders, responseType?: string): Observable<T> => {
    return this.httpClient.get(url, { headers, responseType: 'blob' })
      .pipe(catchError(err => {
        let errorObj = this.getHTTPErrorMessage(err);
        return throwError(errorObj);
      }),
        map((_: any) => _)
      );
  }
  getHTTPErrorMessage(response:any): ErrorResponse {
    if (!(response instanceof HttpErrorResponse)) {
      let result: ErrorResponse = new ErrorResponse();
      result.message=response.toString();
      return result;
    }
    let resp: HttpErrorResponse = <HttpErrorResponse>response;
    const error = response.error;
    if (error !== null && typeof error === 'object') {
      if (error.error) { //unhandeled error from API
        let result: ErrorResponse = new ErrorResponse();
        result.code=resp.status.toString();
        result.message=error.error;
        return result;
      }else{
       // if (this.utils.isValidJson(error)) {
          //response is already a valid error object response
          return error;
        //}
      }
    }

    let result: ErrorResponse = new ErrorResponse();
    result.code=resp.status.toString();
    result.message=resp.message?resp.message:resp.statusText;
    return result;
  }
}
