import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import axios from 'axios';
import { Observable } from 'rxjs';
import { Titulo } from 'src/app/core/models/price-panel/titulo.model';

@Injectable({
  providedIn: 'root'
})
export class PricePanelService {

  constructor() { }

  public async obtenerTitulos() {
    const resp = await axios.get(`${environment.API}/panel/acciones`);
    const { data } = resp;
    const datos = Array.from(data);
    return datos.map((titulo) => {
      return Titulo.serializar(titulo);
    });

  }

  public async capturarOrden(sentido: string) {
    const body = {
      "simboloInstrumento": "AGRO",
      "esEfectivo": true,
      "monedaOid": 1,
      "fecha_orden": "2023-10-02",
      "cantidad": 100,
      "precio": 200,
      "sentido": sentido
    }
    const resp = await axios.post(`${environment.API}/panel/acciones`, body);
    const { data } = resp;
    console.log("🚀 ~ file: price-panel.service.ts:31 ~ PricePanelService ~ capturarOrden ~ data:", data)
    /*  const datos = Array.from(data);
     return datos.map((titulo) => {
       return Titulo.serializar(titulo);
     }); */

  }
}
