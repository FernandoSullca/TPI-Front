import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HandleErrorApiService {

  constructor() { }

  errorHandler(error: HttpErrorResponse): Observable<never> {
		if (error instanceof HttpErrorResponse) {
			if (error.error instanceof ErrorEvent) {
				console.log('ERROR DE CLIENTE');
			} else {
				console.log('ERROR DE SERVIDOR');
				console.log(error.status);
				console.log(error.message);
			}
		} else {
			console.log('OTRO TIPO DE ERROR');
		}
		return throwError(() => error);
	}
}
