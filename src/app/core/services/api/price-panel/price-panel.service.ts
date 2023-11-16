import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Titulo } from 'src/app/core/models/price-panel/titulo.model';
import { LocalStorageService } from '../../LocalStorage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PricePanelService {

  private instrumentoSeleccionado: string = "";
  private behaviorSubjectIntrumentoSeleccionado = new BehaviorSubject<string>(this.instrumentoSeleccionado);

  constructor(private localStorage: LocalStorageService) { }

  mapToTitulos(resp: any) {
    const { data } = resp;
    const datos = Array.from(data);
    const maximoPorPerfil = 20;
    const conservador = datos.filter((instrumento: any) => instrumento?.categoriaPerfil === 'Conservador').slice(0, maximoPorPerfil)
    const agresivo = datos.filter((instrumento: any) => instrumento?.categoriaPerfil === 'Agresivo').slice(0, maximoPorPerfil)
    const moderado = datos.filter((instrumento: any) => instrumento?.categoriaPerfil === 'Moderado').slice(0, maximoPorPerfil)
    const titulos = [...conservador, ...moderado, ...agresivo].sort((a: any, b: any) => a.simbolo > b.simbolo ? 1 : -1);

    return titulos.map((titulo: any) => {
      return Titulo.serializar(titulo);
    });
  }

  public async obtenerTitulos(panel: string) {
    const resp = await axios.get(`${environment.API}/panel/${panel}`);
    return this.mapToTitulos(resp);
  }

  // todo separar logica
  public async capturarOrden(sentido: string, simbolo: string, cantidad: number, objeto: any) {
    let date = new Date()
    let day = `${(date.getDate())}`.padStart(2, '0');
    let month = `${(date.getMonth() + 1)}`.padStart(2, '0');
    let year = date.getFullYear();
    const fecha = `${year}-${month}-${day}`;
    const categoriaInstrumento = objeto.instrumento;
    const body = {
      "simboloInstrumento": simbolo,
      "monedaOid": 1, // siempre 1 moneda peso
      "fecha_orden": fecha, // fecha actual
      "cantidad": cantidad, // cantidad de "acciones" del instrumento
      "sentido": sentido, // venta
      "categoriaInstrumento": categoriaInstrumento
    }
    const token = this.localStorage.getItem("token");
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    const resp = await axios.post(`${environment.API}/orden/capturar`, body, { headers });
    const { data } = resp;

    return data;
  }
  setearSimboloDePortafolioSugerido(simbolo: string) {
    this.behaviorSubjectIntrumentoSeleccionado.next(simbolo);
  }
  obtenerSimboloDePortafolioSugerido(): Observable<string> {
    return this.behaviorSubjectIntrumentoSeleccionado.asObservable();
  }
}
