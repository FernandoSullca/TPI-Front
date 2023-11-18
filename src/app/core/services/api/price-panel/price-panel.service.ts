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
    const maximoPorPerfil = 60;
    const titulosFiltrados = datos.slice(0, maximoPorPerfil)
    const titulos = [...titulosFiltrados].sort((a: any, b: any) => a.simbolo > b.simbolo ? 1 : -1);

    return titulos.map((titulo: any) => {
      return Titulo.serializar(titulo);
    });
  }

  public async obtenerTitulos(panel: string) {
    const resp = await axios.get(`${environment.API}/panel/${panel}`);
    return this.mapToTitulos(resp);
  }

  public async capturarOrden(sentido: string, simbolo: string, cantidad: number, objeto: any) {
    const body = this.creacionBody(sentido, simbolo, cantidad, objeto);
    const token = this.localStorage.getItem("token");
    const headers = this.creacionHeader(token);
    const resp = await axios.post(`${environment.API}/orden/capturar`, body, { headers });
    const { data } = resp;
    return data;
  }
  setearSimboloDePortafolioSugerido(simbolo: string, categoriaInstrumento: string) {
    this.behaviorSubjectIntrumentoSeleccionado.next(simbolo + ',' + categoriaInstrumento);
  }
  obtenerSimboloDePortafolioSugerido(): Observable<string> {
    return this.behaviorSubjectIntrumentoSeleccionado.asObservable();
  }
  creacionFecha(){
    let date = new Date()
    let day = `${(date.getDate())}`.padStart(2, '0');
    let month = `${(date.getMonth() + 1)}`.padStart(2, '0');
    let year = date.getFullYear();
    const fecha = `${year}-${month}-${day}`;
    return fecha;
  }
  creacionBody(sentido: string, simbolo: string, cantidad: number, objeto: any){
    const categoriaInstrumento = objeto.instrumento;
    const body = {
      "simboloInstrumento": simbolo,
      "monedaOid": 1,
      "fecha_orden": this.creacionFecha(),
      "cantidad": cantidad,
      "sentido": sentido,
      "categoriaInstrumento": categoriaInstrumento
    }
    return body
  }
  creacionHeader(token:any){
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
    return headers;
  }
}
