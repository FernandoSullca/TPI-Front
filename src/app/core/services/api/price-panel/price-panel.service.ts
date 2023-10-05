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

  public async capturarOrden(sentido: string, intrumento: string, cantidad: number) {
    let date = new Date()
    let day = `${(date.getDate())}`.padStart(2, '0');
    let month = `${(date.getMonth() + 1)}`.padStart(2, '0');
    let year = date.getFullYear();
    const fecha = `${year}-${month}-${day}`;

    const body = {
      "simboloInstrumento": intrumento,
      "monedaOid": 1, // siempre 1 moneda peso
      "fecha_orden": fecha, // fecha actual
      "cantidad": cantidad, // cantidad de "acciones" del instrumento
      "sentido": sentido // venta
    }
    const resp = await axios.post(`${environment.API}/orden/capturar`, body);
    const { data } = resp;
    return data;
  }
}
