import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  private apiEndpoint = `${environment.API}/api/guardar-usuario`; // Reemplaza con la URL de la API real

  constructor(private http: HttpClient) {}

  registrarUsuario(usuario: any) {
    const body = 
      {
        "cuentaConfirmada": true,
        "activo": true,
        "username": usuario.username,
        "nombre": usuario.name,
        "apellido": usuario.lastname,
        "email": usuario.email,
        "pass":usuario.password
      }      
    return this.http.post(this.apiEndpoint,body);
  }
}
