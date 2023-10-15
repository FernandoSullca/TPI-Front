import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { PreguntaApi } from 'src/app/core/models/API/Pregunta-APi.model';

@Injectable({
  providedIn: 'root'
})
export class PreguntaSubjetivasService  {

  // @Output() disparadordemensageResultado: EventEmitter<any> = new EventEmitter();
  private apiUrlMOCK = 'assets\\mock\\Perfil subjetivo V2.0.json'; // Reemplaza con la URL real de tu JSON
  constructor(private http: HttpClient) { }

  getCuestionario(): Observable<PreguntaApi[]> {
    return this.http.get<PreguntaApi[]>(this.apiUrlMOCK);
  }

}
