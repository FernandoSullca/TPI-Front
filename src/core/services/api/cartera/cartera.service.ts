
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

import { environment } from 'src/environments/environment';
import { HandleErrorApiService } from '../../manejo-errores/handle-error-api.service';
import axios from 'axios';
import { Cartera } from 'src/core/models/cartera/cartera';
import { DolarBolsa } from 'src/core/models/dolar-bolsa/dolar-bolsa';


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
  // {hola: "mundo"} typeof JSON ....>>>>> DolarBolsa
  public async acreditarDinero(cantidad : number, concepto : string) {
    const body = {
      "cantidadPorAcreditar": cantidad,
      "concepto": concepto
    }
    const resp = await axios.post(`${environment.API}/cartera/acreditar/dinero`, body);
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
