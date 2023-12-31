import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import axios from 'axios';
import { PerfilInversorAPI } from 'src/app/core/models/API/Perfil-Inversor-API.model';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionsProfileService {

  public async obtenerTestSubjetivo() {
    const resp = await axios.get(`${environment.API}/api/pregunta/listar-por-categoria?categoria=Test Inversor`);
    const { data } = resp;
    return data;
  }

  public async TestSubjetivoResultados(AnalisisSubjetivo: Record<string, number>, username: String) {
    const body = {
      "horizonteTemporal": AnalisisSubjetivo["Horizonte Temporal"],
      "toleranciaRiesgo": AnalisisSubjetivo["Tolerancia al riesgo"],
      "usuarioDTO": {
        "nombreUsuario": username
      },
    }
    const resp = await axios.post(`${environment.API}/api/perfil-inversor/resultado-perfil-subjetivo`, body);
    const { data } = resp;
    return data;
  }

  async TestSubjetivoResultadosObtenidos(perfilInversorUsuario: PerfilInversorAPI, username: String) {
    const body = {
      "horizonteTemporal": perfilInversorUsuario.horizonteTemporal,
      "toleranciaRiesgo": perfilInversorUsuario.toleranciaRiesgo,
      "usuarioDTO": {
        "nombreUsuario": username,
      }
    }
    const resp = await axios.post(`${environment.API}/api/perfil-inversor/resultado-perfil-subjetivo`, body);
    const { data } = resp;
    return data;
  }
}
