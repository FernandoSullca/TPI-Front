import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HandleErrorApiService } from '../../manejo-errores/handle-error-api.service';
import { Observable, catchError } from 'rxjs';
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
  constructor(private http: HttpClient,private handleErrorService : HandleErrorApiService, private localStorage: LocalStorageService) {}

  getHeaders() {
    const token = this.localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return headers;
  }

  public async getRendimiento()  {
    const token = this.localStorage.getItem("token");
    const resp = await axios.get(this.respRendimientoActual, {headers: {Authorization:`Bearer ${token}`}});

    const { data } = resp;
    debugger;
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
}
