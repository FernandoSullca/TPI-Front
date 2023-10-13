import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import axios from 'axios';
import { eventListeners } from '@popperjs/core';
import { PreguntaApi } from 'src/app/core/models/API/Pregunta-Subjetiva-APi.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionsProfileService {

  @Output() disparadordemensageResultado: EventEmitter<any> = new EventEmitter();
  private apiUrlMOCK = 'assets\\mock\\Perfil subjetivo V2.0.json'; // Reemplaza con la URL real de tu JSON
  constructor(private http: HttpClient) { }

  getCuestionario(): Observable<PreguntaApi[]> {
    return this.http.get<PreguntaApi[]>(this.apiUrlMOCK);
  }
  //Verificado Captura
  public async obtenerTestSubjetivo() {
      const resp = await axios.get(`${environment.API}/api/pregunta/listar`);
      const { data } = resp;
      const datos = Array.from(data);
      return data;
  }

  //Verificado Envio, ¿Captura?
  public async TestSubjetivoResultados(AnalisisSubjetivo: Record<string, number>) {
    const body = {
      "horizonteTemporal": AnalisisSubjetivo["Horizonte Temporal"],
      "toleranciaRiesgo": AnalisisSubjetivo["Tolerancia al riesgo"]
    }
    const resp = await axios.post(`${environment.API}/api/perfil-inversor/resultado-perfil-subjetivo`, body);
    const { data } = resp;
    return data;
  }

  public async TestObjetivoResultados(Analisisobjetivo: Record<string, number>) {
    const body = {
      "horizonteTemporal": Analisisobjetivo["horizonteTemporal"],
      "toleranciaRiesgo": Analisisobjetivo["toleranciaRiesgo"],
      "nivelConocimiento": Analisisobjetivo["Conocimento"]
    }
    const resp = await axios.post(`${environment.API}/api/perfil-inversor/resultado-perfil-inversor`, body);
    const { data } = resp;
    return data;
  }
 

}
