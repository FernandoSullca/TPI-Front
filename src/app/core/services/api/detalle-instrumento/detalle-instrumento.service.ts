import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError } from 'rxjs';


import { HandleErrorApiService } from '../../manejo-errores/handle-error-api.service';
import { DatosGraficoVelas } from 'src/app/core/models/detalle-instrumento/detalle-instrumento';
import { environment } from 'environments/environment';



@Injectable({
  providedIn: 'root'
})
export class DetalleInstrumentoService {
  
  constructor(private http : HttpClient,private handleErrorService: HandleErrorApiService) { }
  
  getDetalleInstrumento(simbolo?:string): Observable<DatosGraficoVelas[]>{
    let resp = `${environment.API}/instrumento/historico/${simbolo}`;
    return this.http.get<DatosGraficoVelas[]>(resp).pipe(
      catchError((error)=>{
        return this.handleErrorService.errorHandler(error);
      })
    );
  }
}
