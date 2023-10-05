import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pregunta } from 'src/app/core/models/perfil-objetivo/preguntaObjetivo.model';

@Injectable({
  providedIn: 'root'
})
export class PreguntaService {


  private preguntasUrl = 'assets\\mock\\pregunta-objetivas,json'; // Ruta al archivo JSON

  constructor(private http: HttpClient) {}

  getPreguntas(): Observable<Pregunta[]> {
    return this.http.get<Pregunta[]>(this.preguntasUrl);
  }
}
