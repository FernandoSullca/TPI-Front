import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HistoricoInstrumento, RendimientoTotalInstrumento } from 'src/app/core/models/rendimiento/rendimiento';
import { LocalStorageService } from '../../LocalStorage/local-storage.service';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class RendimientoService {
  public rendimientoInstrumento!: RendimientoTotalInstrumento[];
  public historicoInstrumento!: HistoricoInstrumento[];
  respRendimientoActual = `${environment.API}/rendimiento/instrumentos/actual`;
  respRendimientoHistorico = `${environment.API}/rendimiento/instrumentos/historico`;
  constructor(private localStorage: LocalStorageService) {}

  getHeaders() {
    const token = this.localStorage.getItem("token");
    return this.creacionHeaders(token);
  }

  public async getRendimiento()  {
    const token = this.localStorage.getItem("token");
    const resp = await axios.get(this.respRendimientoActual, {headers: {Authorization:`Bearer ${token}`}});
    const { data } = resp;
    return data;
}
 
  public async obtenerHistoricoInstrumento(simbolo: string) {
    const body = {
      simboloInstrumento: simbolo
    }
    const token = this.localStorage.getItem("token");
    const resp = await axios.post(this.respRendimientoHistorico, body, {headers: {Authorization:`Bearer ${token}`}});
    const { data } = resp;
    return data;
  }
  
  creacionHeaders(token:any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return headers;
  }
}
