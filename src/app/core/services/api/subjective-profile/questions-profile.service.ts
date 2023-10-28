import { HttpClient } from '@angular/common/http';
import { Injectable, Output } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import axios from 'axios';
import { PerfilInversorAPI } from 'src/core/models/API/Perfil-Inversor-API.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionsProfileService {

  // @Output() disparadordemensageResultado: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) { }

  //Verificado Captura
  public async obtenerTestSubjetivo()  {
      const resp = await axios.get(`${environment.API}/api/pregunta/listar-por-categoria?categoria=Test Inversor`);
  
      const { data } = resp;
   
      return data;
  }

  //Verificado Envio, ¿Captura?
  public async TestSubjetivoResultados(AnalisisSubjetivo: Record<string, number>,username:String) {
    const body = {
      "horizonteTemporal": AnalisisSubjetivo["Horizonte Temporal"],
      "toleranciaRiesgo": AnalisisSubjetivo["Tolerancia al riesgo"],
      "usuarioDTO": {
        "nombreUsuario": username
      },
    }
    const resp = await axios.post(`${environment.API}/api/perfil-inversor/resultado-perfil-subjetivo`, body);
    const { data } = resp;
    return data;
  }

  async TestSubjetivoResultadosObtenidos(perfilInversorUsuario: PerfilInversorAPI){
   
    const body = {

        "horizonteTemporal": perfilInversorUsuario.horizonteTemporal,
        "toleranciaRiesgo": perfilInversorUsuario.toleranciaRiesgo,
        "usuarioDTO": {
          "version": 0,
          "deleted": false,
          "nombreUsuario": perfilInversorUsuario.UsuarioDTO.username,
        }

    }
    const resp = await axios.post(`${environment.API}/api/perfil-inversor/resultado-perfil-subjetivo`,body);

    const { data } = resp;
    return data;

  }


}
