import { LoadingService } from './loading.service';
import { Observable } from 'rxjs';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class InterseptorService implements HttpInterceptor{

  constructor(private loading: LoadingService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    this.loading.addFetch();
    return next.handle(req).pipe(
      tap(
        (event) => {
          if (event instanceof HttpResponse){
            console.log('Server response')
            this.loading.removeFetch();
          }
        },
        (err) => {
          if (err instanceof HttpErrorResponse) {
            console.log('error', err)
          }
        }
      )
    )
  }
}
