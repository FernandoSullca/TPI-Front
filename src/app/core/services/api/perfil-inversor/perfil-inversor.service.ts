import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { PerfilInversorAPI } from 'src/app/core/models/API/Perfil-Inversor-API.model';
import { UsuarioAPI } from 'src/app/core/models/API/Usuario-API.model';

@Injectable({
  providedIn: 'root'
})
export class PerfilInversorService {


  constructor(private http: HttpClient) { }

  public  obtenerPerfil(usuariodb: UsuarioAPI):Observable<PerfilInversorAPI> {
 
    return  this.http.get<PerfilInversorAPI>(`${environment.API}/api/perfil-inversor/listar-por-usuario/${usuariodb.oid}`);
}

}
