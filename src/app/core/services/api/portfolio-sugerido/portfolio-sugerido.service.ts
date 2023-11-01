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
  
  getPortfolioSugerido(tipoPerfil?:string): Observable<PortfolioSugerido>{
    let resp = `${environment.API}/IA/portafolio/sugeridoFake?tipoPerfil=${tipoPerfil}`;
    return this.http.get<PortfolioSugerido>(resp).pipe(
      catchError((error)=>{
        return this.handleErrorService.errorHandler(error);
      })
    );
  }
}
