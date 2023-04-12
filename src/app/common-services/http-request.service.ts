import { DatePipe } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpRequestService {
  constructor(private http: HttpClient, private datePipe: DatePipe) {}
  baseURL = environment.DEV.BASE_URL;

  currentDate = new Date();
  date = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');
  // function for CRUD
  request(
    requestType: string,
    requestURL: string,
    requestBody: any,
    city: string,
    days: string
  ): Observable<any> {
    let params = new HttpParams().set('q', city);
    let params2 = new HttpParams().set('q', city).set('days', days);

    // for get request..
    if (requestType === 'get') {
      if (!days) {
        return this.http.get<any>(this.baseURL + requestURL, {
          params: params,
        });
      } else {
        return this.http.get<any>(this.baseURL + requestURL, {
          params: params2,
        });
      }
    }

    // for post request(adding)..
    if (requestType === 'post') {
      return this.http.post<any>(this.baseURL + requestURL, requestBody);
    }

    // for put request(updating with all required values)..
    if (requestType === 'put') {
      return this.http.put<any>(this.baseURL + requestURL, requestBody);
    }

    // for patch request(updating with specific values)..
    if (requestType === 'patch') {
      return this.http.patch<any>(this.baseURL + requestURL, requestBody);
    }

    // for delete request..
    if (requestType === 'delete') {
      return this.http.delete<any>(this.baseURL + requestURL);
    }
  }
}
