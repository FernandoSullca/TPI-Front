import { HttpClient } from '@angular/common/http';
import {  Injectable,  } from '@angular/core';
import {  Observable,  } from 'rxjs';
import { PreguntaApi } from 'src/app/core/models/API/Pregunta-APi.model';

@Injectable({
  providedIn: 'root'
})
export class PreguntaSubjetivasService  {

  public apiUrlMOCK = 'assets\\mock\\Perfil subjetivo V2.0.json';
  constructor(private http: HttpClient) { }

  public getCuestionario(): Observable<PreguntaApi[]> {
    return this.http.get<PreguntaApi[]>(this.apiUrlMOCK);
  }

}
