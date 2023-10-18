
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { Cartera } from 'src/app/core/models/cartera/cartera';
import { environment } from '../../../../../../environments/environment';
import { HandleErrorApiService } from '../../manejo-errores/handle-error-api.service';
import { DolarBolsa } from 'src/app/core/models/dolar-bolsa/dolar-bolsa';

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
  getPrecioDolarMEP(): Observable<DolarBolsa>{
    const urlBolsa ='https://dolarapi.com/v1/dolares/bolsa';
    return this.http.get<DolarBolsa>(urlBolsa).pipe(
      catchError((error)=>{
        return this.handleErrorService.errorHandler(error);
      })
    )
  }
}
