import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HandleErrorApiService } from '../../manejo-errores/handle-error-api.service';
import { Observable, catchError } from 'rxjs';
import { environment } from 'environments/environment';
import { PrediccionPrecio } from 'src/app/core/models/prediccion-precio/prediccion-precio';

@Injectable({
  providedIn: 'root'
})
export class PrediccionPrecioService {

  constructor(private http : HttpClient,private handleErrorService: HandleErrorApiService) { }
  
  getPrediccionPrecio(): Observable<PrediccionPrecio>{
    let resp = `${environment.API}/prediccion/dolar`;
    return this.http.get<PrediccionPrecio>(resp).pipe(
      catchError((error)=>{
        return this.handleErrorService.errorHandler(error);
      })
    );
  }
}
