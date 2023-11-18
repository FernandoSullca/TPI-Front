import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdministrarPreguntasService {


  constructor(private http: HttpClient) { }

  public CargarSeccionesExcel(archivoSeleccionado: File): Observable<FormData> {
    const encabezado = this.configurarEncabezado();
    const formularioDeDatos = new FormData();
    formularioDeDatos.append('excelSeccion', archivoSeleccionado, archivoSeleccionado.name);
    return this.http.post<FormData>(`${environment.API}/api/seccion/carga-seccion-excel`, formularioDeDatos, { headers: encabezado });
  }

  public CargarCategoriasExcel(archivoSeleccionado: File): Observable<FormData> {
    const encabezado = this.configurarEncabezado();
    const formularioDeDatos = new FormData();
    formularioDeDatos.append('excelCategoria', archivoSeleccionado, archivoSeleccionado.name);
    return this.http.post<FormData>(`${environment.API}/api/categoria/carga-categoria-excel`, formularioDeDatos, { headers: encabezado });
  }

  public CargarPreguntasExcel(archivoSeleccionado: File): Observable<FormData> {
    const encabezado = this.configurarEncabezado();
    const formularioDeDatos = new FormData();
    formularioDeDatos.append('excelPregunta', archivoSeleccionado, archivoSeleccionado.name);
    return this.http.post<FormData>(`${environment.API}/api/pregunta/carga-pregunta-excel`, formularioDeDatos, { headers: encabezado });
  }

  public CargarRespuestasExcel(archivoSeleccionado: File): Observable<FormData> {
    const encabezado = this.configurarEncabezado();

    const formularioDeDatos = new FormData();
    formularioDeDatos.append('excelRespuesta', archivoSeleccionado, archivoSeleccionado.name);
    return this.http.post<FormData>(`${environment.API}/api/respuesta/carga-respuesta-excel`, formularioDeDatos, { headers: encabezado });
  }

  private configurarEncabezado() {
    const encabezados = new HttpHeaders();
    encabezados.append('Content-Type', 'multipart/form-data');
    return encabezados;
  }

  getExcelTemplate() {
    return this.http.get('/assets/documents/Esquema-Preguntas-De-Perfiles.xlsx', { responseType: 'blob' });
  }


}
