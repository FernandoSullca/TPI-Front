import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
// import { Cuestionario } from 'src/app/core/models/initial-profile/questions-profile.model';
import { CuestionarioInitial } from 'src/app/core/models/initial-profile/initial-profile.model';
import { environment } from 'src/environments/environment';
import axios from 'axios';
import { eventListeners } from '@popperjs/core';
// import { Cuestionario } from 'src/app/core/models/initial-profile/initial-profile.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionsProfileService {
  @Output() disparadordemensageResultado:EventEmitter<any>=new EventEmitter(); 
  private apiUrl = 'assets\\mock\\Perfil subjetivo V1.0.json'; // Reemplaza con la URL real de tu JSON
  //private apiUrl = 'assets\\mock\\Perfil subjetivo categoria agregada.json'; // Reemplaza con la URL real de tu JSON
  //private apiUrl=environment.API
  constructor(private http: HttpClient) { }

  getCuestionario(): Observable<CuestionarioInitial> {
    return this.http.get<CuestionarioInitial>(this.apiUrl);
  }
//Verificado Captura
  public async obtenerTestSubjetivo() {
    const resp = await axios.get(`${environment.API}/api/pregunta/listar`);
    const { data } = resp;
    const datos = Array.from(data);
    console.log(datos);
    return datos.map((test) => {
    return CuestionarioInitial.serializar(test);
    });
  }

  //Verificado Envio, ¿Captura?
  public async TestSubjetivoResultados(AnalisisSubjetivo: Record<string, number>) {
    
    
    const body = {
      "horizonteTemporal":AnalisisSubjetivo["Horizonte Temporal"],
      "toleranciaRiesgo":AnalisisSubjetivo["Tolerancia al riesgo"]
    }
    const resp = await axios.post(`${environment.API}/api/perfil-inversor/resultado-perfil-subjetivo`, body);
    const { data } = resp;
    return data;
  }
////////////
private perfilSubject = new Subject<any>();

enviarPerfil(perfil: any) {
  this.perfilSubject.next(perfil);
}

obtenerPerfil() {
  console.log(this.perfilSubject.asObservable().forEach);
  console.log(this.perfilSubject.asObservable());
  return this.perfilSubject.asObservable();
  
}

}
