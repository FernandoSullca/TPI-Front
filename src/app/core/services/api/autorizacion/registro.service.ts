import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioAPI } from 'src/app/core/models/API/Usuario-API.model';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  private apiEndpoint = `${environment.API}/api/guardar-usuario`; // Reemplaza con la URL de la API real

  constructor(private http: HttpClient) { }

  registrarUsuario(usuario: any) {

    const body =
    {
      "cuentaConfirmada": true,
      "activo": true,
      "username": usuario.username,
      "nombre": usuario.name,
      "apellido": usuario.lastname,
      "email": usuario.username,

    }
    return this.http.post(`${environment.API}/api/guardar-usuario`, body);
  }

  verificarExistencia(usuario: any) {
    const body =
    {
      "email": usuario.eusername,

    }
    return this.http.post(this.apiEndpoint, body);
  }

  buscarUsuario(usuario: string):Observable<UsuarioAPI> {
    return this.http.get<UsuarioAPI>(`${environment.API}/api/obtener-usuario/${usuario}`);
  }
}
