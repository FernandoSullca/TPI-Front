
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

import { environment } from 'environments/environment';
import { HandleErrorApiService } from '../../manejo-errores/handle-error-api.service';
import axios from 'axios';
import { Cartera } from 'src/app/core/models/cartera/cartera';
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
  // {hola: "mundo"} typeof JSON ....>>>>> DolarBolsa
  public async acreditarDinero(cantidad : number, concepto : string) {
    const body = {
      "cantidadPorAcreditar": cantidad,
      "concepto": concepto
    }

    try {
      const resp = await axios.post(`${environment.API}/cartera/acreditar/dinero`, body);
      console.info(resp.data)
    } catch (error) {
      console.error('Error al acreditar dinero:', error);
      // Puedes mostrar un mensaje de error o realizar otras acciones de manejo de errores aquí
    }
    // const resp = await axios.post(`${environment.API}/cartera/acreditar/dinero`, body);
  
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
