import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError } from 'rxjs';
import { environment } from 'environments/environment';
import { DetalleInstrumento } from 'src/app/core/models/detalle-instrumento/detalle-instrumento';
import { HandleErrorApiService } from '../../manejo-errores/handle-error-api.service';

@Injectable({
  providedIn: 'root'
})
export class DetalleInstrumentoService {
  
  private datosSubject = new Subject<string>();
  
  constructor(private http : HttpClient,private handleErrorService: HandleErrorApiService) { }
  
  getDetalleInstrumento(simbolo:string): Observable<DetalleInstrumento>{
    let resp = `${environment.API}/instrumento/historico/${simbolo}`;
    return this.http.get<DetalleInstrumento>(resp).pipe(
      catchError((error)=>{
        return this.handleErrorService.errorHandler(error);
      })
    );
  }
}
