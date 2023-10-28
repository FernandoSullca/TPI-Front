import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PreguntaApi } from '@core/models/API/Pregunta-APi.model';

@Injectable({
  providedIn: 'root'
})
export class PreguntaObjetivasService {

  //Por defecto Busco el conservador
  private preguntasUrlMOCK = 'assets\\mock\\Perfil Objetivo Moderado V1.0.json'; // Ruta al archivo JSON

  private preguntasConservadorUrl = 'assets\\mock\\Perfil Objetivo Conservador V1.0.json'; // Ruta al archivo JSON
  private preguntasModeradoUrl = 'assets\\mock\\Perfil Objetivo Moderado V1.0.json'; // Ruta al archivo JSON
  private preguntasArriesgadoUrl = 'assets\\mock\\Perfil Objetivo Arriesgado V1.0.json'; // Ruta al archivo JSON
  private Res:PreguntaApi[]=[];
  constructor(private http: HttpClient) {}

  getPreguntas(tipo:string): Observable<PreguntaApi[]> {

    switch(tipo){
      case 'CONSERVADOR':
        this.preguntasUrlMOCK = this.preguntasConservadorUrl; // Ruta al archivo JSON
        break;
      case 'MODERADO': 
        this.preguntasUrlMOCK = this.preguntasModeradoUrl; 
        break;
      case 'AGRESIVO':
        this.preguntasUrlMOCK = this.preguntasArriesgadoUrl;
        break;
      default:
        console.log("Tipo de perfil no existente");
        break;
    }

    return this.http.get<PreguntaApi[]>(this.preguntasUrlMOCK);
  }
}
