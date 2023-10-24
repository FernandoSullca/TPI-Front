import { Injectable } from '@angular/core';
import { PerfilInversorAPI } from '../../models/API/Perfil-Inversor-API.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public perfilInversor: PerfilInversorAPI = {

    oid: 0,

    version: 0,

    horizonteTemporal: 0,

    toleranciaRiesgo: 0,

    tipoPerfilSubjetivo: "",

    nivelConocimiento: 0,
    tipoNivelConocimiento: "",

    perfilInversor: "",

    UsuarioDTO: {
      oid: 0,
      pass: "",
      nombreUsuario: "",
      nombre: "",
      apellido: "",
      email: "",
      cuentaConfirmada: false,
      activo: false,
    },

  }
  // Métodos para guardar y obtener datos en localStorage
  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string): any {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  setUsuario(data:any){
    this.perfilInversor.UsuarioDTO=data;
    console.log(this.perfilInversor);
  } 

  setPerfilSubjetivo(data:any){
    this.perfilInversor=data;
    console.log(this.perfilInversor);
  }

  SetPerfilActualLocal() {
    console.log(this.perfilInversor)
    this.setItem("Perfil",this.perfilInversor);
  }
  
  GetPerfilActualLocal() {
    console.log(this.perfilInversor)
   return this.getItem("Perfil");
  }
  
  RemovePerfilActualLocal() {
    localStorage.removeItem("Perfil");
  }
  
  UpdatePerfilActualLocal(perfil:PerfilInversorAPI) {
    this.setItem("Perfil",perfil);
  }

}



