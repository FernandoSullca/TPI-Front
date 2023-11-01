import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HandleErrorApiService } from '../../manejo-errores/handle-error-api.service';
import { Observable, catchError } from 'rxjs';
import { environment } from 'environments/environment';
import { PortfolioSugerido } from 'src/app/core/models/portfolio-sugerido/portfolio-sugerido';

@Injectable({
  providedIn: 'root'
})
export class PortfolioSugeridoService {

  constructor(private http : HttpClient,private handleErrorService: HandleErrorApiService) { }
  
  getPortfolioSugerido(tipoPerfil?:string,url?:string): Observable<PortfolioSugerido[]>{
    let resp = `${environment.API}/IA/portafolio/sugeridoFake?tipoPerfil=${tipoPerfil}&url=${url}`;
    return this.http.get<PortfolioSugerido[]>(resp).pipe(
      catchError((error)=>{
        return this.handleErrorService.errorHandler(error);
      })
    );
  }
  obtenerNuevoPortfolioSugerido(idProducto: number): Observable<any> {
    const url = `${environment.API}/resto de URL`;
    const data = { idProducto: idProducto }; 
    console.log(`llegue al servicio: ${idProducto}`);
    return this.http.post(url, data).pipe(
      catchError((error) => {
        return this.handleErrorService.errorHandler(error);
      })
    );
  }
}
