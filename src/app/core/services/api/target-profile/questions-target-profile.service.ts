import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { PreguntaApi  } from 'src/app/core/models/API/Pregunta-APi.model';
import { environment } from 'environments/environment';
import axios from 'axios';
@Injectable({
  providedIn: 'root'
})
export class QuestionsTargetService {

  @Output() disparadordemensageResultado: EventEmitter<any> = new EventEmitter();
  private preguntasObjetivas = 'Test Conocimiento'; // Ruta al archivo JSON
  constructor(private http: HttpClient) {}

  // getPreguntas(): Observable<PreguntaApi[]> {
  //   return this.http.get<PreguntaApi[]>(this.preguntasUrl);
  // }

  //Verificado Captura
  public async obtenerTestObjetivo(tipo:string) {

    switch(tipo){
      case 'CONSERVADOR':
        this.preguntasObjetivas = 'Test Conocimiento'; // Ruta al archivo JSON
        break;
      case 'MODERADO': 
        this.preguntasObjetivas ='Test Conocimiento Moderado'; 
        break;
      case 'AGRESIVO':
        this.preguntasObjetivas = 'Test Conocimiento Arriesgado';
        break;
      default:
        console.log("Tipo de perfil no existente");
        break;
    }
    const resp = await axios.get(`${environment.API}/api/pregunta/listar-por-categoria?categoria=${this.preguntasObjetivas}`);
    const { data } = resp;
    console.log(data)
    const datos = Array.from(data);
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
