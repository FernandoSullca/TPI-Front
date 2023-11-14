import { Injectable } from '@angular/core';
import { PerfilInversorAPI } from '../../models/API/Perfil-Inversor-API.model';
import { UsuarioAPI } from '../../models/API/Usuario-API.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public perfilInversor: PerfilInversorAPI = {
    oid: 0,
    deleted: 0,
    version: 0,
    horizonteTemporal: 0,
    toleranciaRiesgo: 0,
    tipoPerfilSubjetivo: "",
    nivelConocimiento: 0,
    tipoNivelConocimiento: "",
    perfilInversor: "",
    resultadoPerfilado: "",
    UsuarioDTO: {
      oid: 0,
      version: 0,
      pass: "",
      username: "",
      nombreUsuario: "",
      nombre: "",
      apellido: "",
      email: "",
      cuentaConfirmada: false,
      activo: false,
    }
  }

  // Métodos para guardar y obtener datos en localStorage
  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string): any {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  removeAllItems() {
    localStorage.clear();
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  setPerfilSubjetivo(data: any) {
    this.perfilInversor = data;
  }

  setPerfilObjetivo(data: any) {
    this.perfilInversor = data;
  }

  SetPerfilActualLocal() {
    this.setItem("Perfil", this.perfilInversor);
  }

  GetPerfilActualLocal() {
    return this.getItem("Perfil");
  }

  setUsuarioPerfilActualLocal(data: any) {
    this.perfilInversor.UsuarioDTO = data;
  }

  GetUsuarioPerfilActualLocal() {
    return this.getItem("Perfil").usuarioDTO;
  }

  RemovePerfilActualLocal() {
    localStorage.removeItem("Perfil");
  }

  UpdatePerfilActualLocal(perfil: PerfilInversorAPI) {
    this.setItem("Perfil", perfil);
  }

}



