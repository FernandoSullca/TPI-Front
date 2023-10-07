import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cuestionario } from 'src/app/core/models/initial-profile/questions-profile.model';
import { environment } from 'src/environments/environment';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class QuestionsProfileService {
 
  private apiUrl = 'assets\\mock\\Perfil subjetivo.json'; // Reemplaza con la URL real de tu JSON
  private data = {
    "preguntas": [
      {
        "descripcion": "¿En cuáles de estos instrumentos has invertido alguna vez?",
        "tipo": "checkbox",
        "respuestas": [
          "Plazo Fijo",
          "Fondos Comunes de Inversión",
          "Bonos",
          "Acciones",
          "Opciones",
          "Futuros"
        ]
      },
      {
        "descripcion": "¿Cuántos años tenés?",
        "tipo": "radio",
        "respuestas": [
          "Menos de 30",
          "30-40",
          "41-50",
          "Más de 50"
        ]
      },
      {
        "descripcion": "¿Cuál es tu nivel de conocimiento en los siguientes instrumentos?",
        "tipo": "botones-unica-opcion",
        "respuestas": [
          {
            "instrumento": "Fondos Comunes de Inversión",
            "respuestas": ["BAJA", "MEDIA", "ALTA"]
          },
          {
            "instrumento": "Bonos",
            "respuestas": ["BAJA", "MEDIA", "ALTA"]
          },
          {
            "instrumento": "Acciones",
            "respuestas": ["BAJA", "MEDIA", "ALTA"]
          },
          {
            "instrumento": "Opciones",
            "respuestas": ["BAJA", "MEDIA", "ALTA"]
          },
          {
            "instrumento": "Futuros",
            "respuestas": ["BAJA", "MEDIA", "ALTA"]
          }
        ]
      }
    ]
  };
  private apiUrrPostmant='http://localhost:3000'
  constructor(private http: HttpClient) { }

  getPreguntas(): Observable<Cuestionario> {
    return this.http.get<Cuestionario>(this.apiUrl);
  }

  getCuestionario(): Observable<Cuestionario> {
    return this.http.get<Cuestionario>(this.apiUrl);
  }
  getCuestionarioInicial() {
    return this.data;
  }

  public async TestSubjetivoResultados(AnalisisSubjetivo: Record<string, number>) {
    const body = {
      AnalisisSubjetivo
    }
    const resp = await axios.post(`${this.apiUrrPostmant}/perfil-Subjetivo/resultado`, body);
    const { data } = resp;
    console.log(data);
    return data;
  }
}
