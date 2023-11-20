import { Injectable } from '@angular/core';

import { environment } from 'environments/environment';
import axios from 'axios';
import { PerfilInversorAPI } from 'src/app/core/models/API/Perfil-Inversor-API.model';
@Injectable({
  providedIn: 'root'
})
export class QuestionsTargetService {
  private preguntasObjetivas = 'Test Conocimiento';
  private urlcertificado = 'Test Conocimiento';

  public async obtenerTestObjetivo(tipo: string) {
    switch (tipo) {
      case 'CONSERVADOR':
        this.preguntasObjetivas = 'Test Conocimiento';
        break;
      case 'MODERADO':
        this.preguntasObjetivas = 'Test Conocimiento Moderado';
        break;
      case 'AGRESIVO':
        this.preguntasObjetivas = 'Test Conocimiento Arriesgado';
        break;
      default:
        console.error("Tipo de perfil-test no existente");
        break;
    }
    const resp = await axios.get(`${environment.API}/api/pregunta/listar-por-categoria?categoria=${this.preguntasObjetivas}`);
    const { data } = resp;
    return data;
  }

  public async TestObjetivoResultados(Analisisobjetivo: Record<string, number>, username: string): Promise<any> {

    const body = {

      "horizonteTemporal": Analisisobjetivo["horizonteTemporal"],
      "toleranciaRiesgo": Analisisobjetivo["toleranciaRiesgo"],
      "nivelConocimiento": Analisisobjetivo["Conocimento"],
      "usuarioDTO": {
        "nombreUsuario": username
      },
    }
    const resp = await axios.post(`${environment.API}/api/perfil-inversor/resultado-perfil-inversor`, body);
    const { data } = resp;
    return data;
  }

  async TestObjetivoResultadosObtenidos(perfilInversorUsuario: PerfilInversorAPI): Promise<any> {
    const regex = /\"/ig;
    const username = localStorage.getItem("Username")?.replace(regex, "");
    const body = {
      "horizonteTemporal": perfilInversorUsuario.horizonteTemporal,
      "toleranciaRiesgo": perfilInversorUsuario.toleranciaRiesgo,
      "nivelConocimiento": perfilInversorUsuario.nivelConocimiento,
      "usuarioDTO": {
        nombreUsuario: username,
      }
    }
    const resp = await axios.post(`${environment.API}/api/perfil-inversor/resultado-perfil-inversor`, body);
    const { data } = resp;
    return data;
  }


  public async obtenerinforme(usuario: string) {

    const resp = await axios.get(`${environment.API}/api/perfil-inversor/obtener-certificado?nombreUsuario=${usuario}`, { responseType: 'blob' });
    return resp.data;
  }

  public verinforme(perfilObtenido: string) {
    const perfiles: any = {
      "MODERADO": "assets/perfiles/perfil_inversor_moderado.pdf",
      "CONSERVADOR": "assets/perfiles/perfil_inversor_conservador.pdf",
      "AGRESIVO": 'assets/perfiles/perfil_inversor_agresivo.pdf'
    };


    const url = `/${perfiles[perfilObtenido]}`;
    window.open(url);
  }

  solicitarlinkCertificado(usuario: string, tipo: string) {
    const url = `${environment.API}/api/perfil-inversor/obtener-certificado?nombreUsuario=${usuario}`;
    return url
  }

  async obtenercertificadoLocal(prefil: string): Promise<Blob | null> {

    switch (prefil) {
      case 'CONSERVADOR':
        this.urlcertificado = 'assets/perfiles/perfil_inversor_conservador.pdf';
        break;
      case 'MODERADO':
        this.urlcertificado = 'assets/perfiles/perfil_inversor_moderado.pdf';
        break;
      case 'AGRESIVO':
        this.urlcertificado = 'assets/perfiles/perfil_inversor_agresivo.pdf';
        break;
      default:
        this.urlcertificado = 'assets/perfiles/perfil_inversor_conservador.pdf';
        break;
    }

    try {
      const response = await fetch(this.urlcertificado);

      if (response.ok) {
        const blob = await response.blob();
        return blob;
      } else {
        console.error('Error al obtener el certificado local.');
        return null;
      }
    } catch (error) {
      console.error('Error al obtener el certificado local: ', error);
      return null;
    }
  }


  urlcertificadoLocal(perfil: string) {


    switch (perfil) {
      case 'CONSERVADOR':
        return 'assets/perfiles/perfil_inversor_conservador.pdf';
        break;
      case 'MODERADO':
        return 'assets/perfiles/perfil_inversor_moderado.pdf';
        break;
      case 'AGRESIVO':
        return 'assets/perfiles/perfil_inversor_agresivo.pdf';
        break;
      default:
        return 'assets/perfiles/perfil_inversor_conservador.pdf';
        break;
    }
  }

  solicitarlinkCertificadoLocal(tipo: string) {
    let urlQR: string = "";
    let urllocal = this.urlcertificadoLocal(tipo);
    urlQR = `https://mercadojunior.com.ar/${urllocal}`;
    return urlQR;
  }

}
