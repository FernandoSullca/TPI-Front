import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cuestionario } from 'src/app/core/models/profile-inicial/questions-profile.model';
import { environment } from 'src/environments/environment';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class QuestionsProfileService {
 
  private apiUrl = 'assets\\mock\\Perfil subjetivo.json'; // Reemplaza con la URL real de tu JSON
  // private apiUrl=environment.API
  constructor(private http: HttpClient) { }

  getCuestionario(): Observable<Cuestionario> {
    return this.http.get<Cuestionario>(this.apiUrl);
  }

  public async TestSubjetivoResultados(AnalisisSubjetivo: Record<string, number>) {
    const body = {
      AnalisisSubjetivo
    }
    const resp = await axios.post(`${this.apiUrl}/perfil-Subjetivo/resultado`, body);
    const { data } = resp;
    console.log(data);
    return data;
  }
}
