import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';

import { HandleErrorApiService } from '../../manejo-errores/handle-error-api.service';
import { DatosGraficoVelas } from 'src/core/models/detalle-instrumento/detalle-instrumento';

@Injectable({
  providedIn: 'root'
})
export class DetalleInstrumentoService {
  
  private datosSubject = new Subject<string>();
  
  constructor(private http : HttpClient,private handleErrorService: HandleErrorApiService) { }
  
  getDetalleInstrumento(simbolo:string): Observable<DatosGraficoVelas[]>{
    let resp = `${environment.API}/instrumento/historico/${simbolo}`;
    return this.http.get<DatosGraficoVelas[]>(resp).pipe(
      catchError((error)=>{
        return this.handleErrorService.errorHandler(error);
      })
    );
  }
}
