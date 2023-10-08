
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { Cartera } from 'src/app/core/models/cartera/cartera';
import { environment } from 'src/environments/environment';
import { HandleErrorApiService } from '../../manejo-errores/handle-error-api.service';

@Injectable({
  providedIn: 'root'
})
export class CarteraService {
  resp = `${environment.API}/cartera/valuacion/total`;
  constructor(private http: HttpClient,private handleErrorService : HandleErrorApiService ) {}

  getCartera(): Observable<Cartera>{
    return this.http.get<Cartera>(this.resp).pipe(
      catchError((error)=>{
        return this.handleErrorService.errorHandler(error);
      })
    );
  }
}
