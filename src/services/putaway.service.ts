import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BaseService } from './base.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/Observable/throw';

@Injectable()
export class PutAwayService extends BaseService {

    get(data: any): Observable<any> {
        return this.http.post(this.urlAPI + '/getlocation', JSON.stringify(data), this.httpOptions).catch(this.handleError);
    }

    list(data: any): Observable<any> {
        return this.http.post(this.urlAPI + '/listlocation', JSON.stringify(data), this.httpOptions).catch(this.handleError);
    }

    update(data: any): Observable<any> {
        return this.http.post(this.urlAPI + '/updatelocation', JSON.stringify(data), this.httpOptions).catch(this.handleError);
    }

    handleError(error: HttpErrorResponse) {
        console.error(error);
        return Observable.throw(error);
    }

}
