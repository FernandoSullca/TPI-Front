import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HandleErrorApiService } from '../../manejo-errores/handle-error-api.service';
import { Observable, catchError } from 'rxjs';
import { environment } from 'environments/environment';
import { PortfolioSugerido } from 'src/app/core/models/portfolio-sugerido/portfolio-sugerido';
import { LocalStorageService } from '../../LocalStorage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PortfolioSugeridoService {

  constructor(private http : HttpClient,private handleErrorService: HandleErrorApiService, private localStorage : LocalStorageService) { }
  private simboloSeleccionado : string = "";

  getPortfolioSugerido(tipoPerfil?:string,idProducto?:number): Observable<PortfolioSugerido[]>{
   
    if (idProducto == null) {
      idProducto = 0; 
    }
        
    let resp = `${environment.API}/IA/portafolio/sugerido?tipoPerfil=${tipoPerfil}&idProducto=${idProducto}`;
    return this.http.get<PortfolioSugerido[]>(resp).pipe(
      catchError((error)=>{
        return this.handleErrorService.errorHandler(error);
      })
    );
  }
  obtenerNuevoPortfolioSugerido(idProducto: number): Observable<any> {
    const perfilInversorUsuario=this.localStorage.GetPerfilActualLocal();
    let tipoPerfil = perfilInversorUsuario.perfilInversor
   return this.getPortfolioSugerido(tipoPerfil, idProducto);
}
}
