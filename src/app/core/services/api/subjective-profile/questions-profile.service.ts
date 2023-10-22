import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'environments/environment';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class QuestionsProfileService {

  // @Output() disparadordemensageResultado: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) { }

  //Verificado Captura
  public async obtenerTestSubjetivo()  {
      const resp = await axios.get(`${environment.API}/api/pregunta/listar-por-categoria?categoria=Test Inversor`);
      console.log( resp)
      const { data } = resp;
      // const datos = Array.from(data);
      console.log(data)
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

}
