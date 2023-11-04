import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HandleErrorApiService } from '../../manejo-errores/handle-error-api.service';
import { Observable, catchError } from 'rxjs';
import { environment } from 'environments/environment';
import { PortfolioSugerido } from 'src/app/core/models/portfolio-sugerido/portfolio-sugerido';
import { LocalStorageService } from '../../LocalStorage/local-storage.service';
import { TestPerfilInversorObjetivoComponent } from 'src/app/presentation/features/dashboard/sections/perfil-inversor-objetivo/stage/test-perfil-inversor-objetivo/test-perfil-inversor-objetivo.component';

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

    var perfilInversorUsuario=this.localStorage.GetPerfilActualLocal();

    var tipoPerfil = perfilInversorUsuario.perfilInversor
   return this.getPortfolioSugerido(tipoPerfil, idProducto);
}
}
