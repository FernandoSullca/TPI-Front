import { Injectable } from '@angular/core';
import { HttpRequest,HttpHandler,HttpEvent,HttpInterceptor } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router : Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {


    return next.handle(request).pipe(
      catchError((err)=>{
        console.log(err);
        if([401,403,404].indexOf(err.status)!== -1){
          this.router.navigateByUrl('/'+err.status);
        }
        return throwError(() => err);
      })
    );
  }
}
