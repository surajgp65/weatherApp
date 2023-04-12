import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, finalize } from 'rxjs/operators';
import * as $ from 'jquery';
import { CommonService } from './common.service';

@Injectable()
export class HttpErrorInterceptorInterceptor implements HttpInterceptor {

  constructor(private commonService: CommonService) { }
  private totalRequests = 0

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.totalRequests++;
    $('#loader').show();
    const reqWithAuth = request.clone({
      setHeaders: {
        'X-RapidAPI-Key': `80807fd3c2mshd9562466f6d4db1p1bdde0jsn093b54c362f8`,
        'X-RapidAPI-Host': `weatherapi-com.p.rapidapi.com`,
      }
    })
    return next.handle(reqWithAuth).pipe(

      // retry function for retry api automatically
      // retry(1),
      finalize(() => {
        // all reuest hit then spiiner hide..
        this.totalRequests--;
        if (this.totalRequests === 0) {
          setTimeout(() => {
            $('#loader').hide();
          }, 500);
        }
      }),

      // API error handling...
      catchError((error: HttpErrorResponse) => {
        if (error.error) {
          this.commonService.errorToaster(error.error.message)
          console.log("errie is",error.error);
          
        }
        return throwError(error)

      })

    );
  }
}
