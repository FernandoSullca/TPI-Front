import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { Cuestionario } from 'src/app/core/models/initial-profile/questions-profile.model';
import { CuestionarioInitial } from 'src/app/core/models/initial-profile/initial-profile.model';
import { environment } from 'src/environments/environment';
import axios from 'axios';
// import { Cuestionario } from 'src/app/core/models/initial-profile/initial-profile.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionsProfileService {
 
  private apiUrl = 'assets\\mock\\Perfil subjetivo.json'; // Reemplaza con la URL real de tu JSON
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
    console.log(data);
    return data;
  }


  public data: any;

  setperfil(data: string) {
    this.data = data;
    console.log("Guardando dato enservicio");
    console.log(data);
    console.log("Guardando dato enservicio");
    console.log(this.data);
  }

  getperfil() {
    console.log("REcuperando datos enservicio");
    console.log(this.data);
    return this.data;
  }
}
