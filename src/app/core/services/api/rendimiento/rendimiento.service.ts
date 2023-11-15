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
  resp = `${environment.API}/rendimiento/instrumentos/actual`;
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
    const resp = await axios.get(this.resp, {headers: {Authorization:`Bearer ${token}`}});

    const { data } = resp;
    return data;
}
 
  obtenerHistoricoInstrumento(simbolo: string) {
    this.historicoInstrumento = [
      {
        simbolo: simbolo,
        cantidad: 10,
        fecha: new Date('2023-11-08'),
        porcentajeRendimiento: 1.5,
        gananciaPerdidaDiaria: 15,
        totalValorizadoDiario: 1600
      },
      {
        simbolo: simbolo,
        cantidad: 10,
        fecha: new Date('2023-11-09'),
        porcentajeRendimiento: -0.8,
        gananciaPerdidaDiaria: -8,
        totalValorizadoDiario: 1585
      },
      {
        simbolo: simbolo,
        cantidad: 10,
        fecha: new Date('2023-11-10'),
        porcentajeRendimiento: 2.3,
        gananciaPerdidaDiaria: 23,
        totalValorizadoDiario: 1620
      }
    ];
    return this.historicoInstrumento;
  }
}
