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

}
