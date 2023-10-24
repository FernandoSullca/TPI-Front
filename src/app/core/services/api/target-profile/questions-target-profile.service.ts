import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PreguntaApi } from 'src/app/core/models/API/Pregunta-APi.model';
import { EventEmitter, Injectable, Output } from '@angular/core';

import { environment } from 'environments/environment';
import axios from 'axios';
import { PerfilInversorAPI } from 'src/app/core/models/API/Perfil-Inversor-API.model';
@Injectable({
  providedIn: 'root'
})
export class QuestionsTargetService {

  // @Output() disparadordemensageResultado: EventEmitter<any> = new EventEmitter();
  private preguntasObjetivas = 'Test Conocimiento'; // Ruta al archivo JSON
  private urlcertificado = 'Test Conocimiento';
  constructor() { }

  public async obtenerTestObjetivo(tipo: string) {

    switch (tipo) {
      case 'CONSERVADOR':
        this.preguntasObjetivas = 'Test Conocimiento'; // Ruta al archivo JSON
        break;
      case 'MODERADO':
        this.preguntasObjetivas = 'Test Conocimiento Moderado';
        break;
      case 'AGRESIVO':
        this.preguntasObjetivas = 'Test Conocimiento Arriesgado';
        break;
      default:
        console.log("Tipo de perfil no existente");
        break;
    }
    const resp = await axios.get(`${environment.API}/api/pregunta/listar-por-categoria?categoria=${this.preguntasObjetivas}`);
    const { data } = resp;
    console.log(data)
    const datos = Array.from(data);
    return data;
  }

  public async TestObjetivoResultados(Analisisobjetivo: Record<string, number>, username: String): Promise<any> {

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
   console.log(perfilInversorUsuario)
    const body = {
      "oid": perfilInversorUsuario.oid,
      "horizonteTemporal": perfilInversorUsuario.horizonteTemporal,
      "toleranciaRiesgo": perfilInversorUsuario.toleranciaRiesgo,
      "nivelConocimiento": perfilInversorUsuario.nivelConocimiento,
      "tipoPerfilSubjetivo": perfilInversorUsuario.tipoPerfilSubjetivo,
      "usuarioDTO": {
        "oid":perfilInversorUsuario.UsuarioDTO.oid,
        "nombre": perfilInversorUsuario.UsuarioDTO.nombre,
        "apellido": perfilInversorUsuario.UsuarioDTO.apellido,
        "email": perfilInversorUsuario.UsuarioDTO.email,
        "nombreUsuario": perfilInversorUsuario.UsuarioDTO.username,
      }
    }
    const resp = await axios.post(`${environment.API}/api/perfil-inversor/resultado-perfil-inversor`, body);
    console.log(resp)
    const { data } = resp;
    return data;
  }


  public async obtenerinforme(usuario: string) {

    const resp = await axios.get(`${environment.API}/api/perfil-inversor/obtener-certificado?nombreUsuario=${usuario}`, { responseType: 'blob' });
    return resp.data;
  }

  public verinforme(usuario: string) {
    const url = `${environment.API}/api/perfil-inversor/obtener-certificado?nombreUsuario=${usuario}`;
    window.open(url);
  }

  solicitarlinkCertificado(usuario: string, tipo: string) {
    const url = `${environment.API}/api/perfil-inversor/obtener-certificado?nombreUsuario=${usuario}`;
    return url
  }

  //Link de descargar del pdf en local
  async obtenercertificadoLocal(prefil: string): Promise<Blob | null> {

    switch (prefil) {
      case 'CONSERVADOR':
        this.urlcertificado = 'assets/perfiles/perfil_inversor_conservador.pdf'; // Ruta al archivo JSON
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
    console.log(perfil);

    switch (perfil) {
      case 'CONSERVADOR':
        return 'assets/perfiles/perfil_inversor_conservador.pdf'; // Ruta al archivo JSON
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

  //Link para el Qr que le solicita al Api.mercadoJR
  solicitarlinkCertificadoLocal(usuario: string, tipo: string) {
    let urlQR: string = "";
    let urllocal = this.urlcertificadoLocal(tipo);
    urlQR = `https://mercadojunior.com.ar/${urllocal}`;
    return urlQR;    
  }

}
