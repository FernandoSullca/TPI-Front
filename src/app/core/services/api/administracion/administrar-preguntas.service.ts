import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/app/core/environments/environment';
import { Observable, of } from 'rxjs';
import { concatMap, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdministrarPreguntasService {

  constructor(private http: HttpClient) { }

  // Define un observable para la secuencia


  //Verificado Envio, ¿Captura?
  public CargarExcelDePreguntas(excelPreg: File): Observable<any> {

    const headers = new HttpHeaders(); // Importa HttpHeaders desde '@angular/common/http'
    headers.append('Content-Type', 'multipart/form-data'); // Configura el encabezado 'Content-Type'

    const secuencia$ = of(null).pipe(
      concatMap(() => this.CargarSeccion(excelPreg, headers)),
      concatMap(() => this.CargarCategorias(excelPreg, headers)),
      concatMap(() => this.CargarPreguntas(excelPreg, headers)),
      concatMap(() => this.CargarRespuestas(excelPreg, headers)),
      catchError((error) => {
        console.error('Se produjo un error en una de las solicitudes', error);
        return of(null); // Continuar con la secuencia en caso de error
      })

    );

    return secuencia$;
    // try {
    //     await this.CargarSeccion(excelPreg, headers);
    // } catch (error) {
    //     console.error('Error al cargar sección:', error);
    //  }

    // try {
    //   await this.CargarCategorias(excelPreg, headers);
    // } catch (error) {
    //   console.error('Error al cargar categorías:', error);
    // }

    // try {
    //   await this.CargarPreguntas(excelPreg, headers);
    // } catch (error) {
    //   console.error('Error al cargar preguntas:', error);
    // }

    // try {
    //   await this.CargarRespuestas(excelPreg, headers);
    // } catch (error) {
    //   console.error('Error al cargar respuestas:', error);
    // }

  }

  public async CargarSeccion(excelPreg: File, headers: HttpHeaders) {
    console.log("Cargando Seccion....");
    const formData = new FormData();
    formData.append('excelSeccion', excelPreg, excelPreg.name);

    this.http
      .post<FormData>(`${environment.API}/api/seccion/carga-seccion-excel`, formData, { headers: headers })

      .subscribe((response) => {
        console.log('Archivo Seccion subido exitosamente', response);
      },
        (error) => {
          console.error('Error al subir el archivo Seccion', error);
        }
      );
  }
  public async CargarCategorias(excelPreg: File, headers: HttpHeaders) {

    const formData = new FormData();
    formData.append('excelCategoria', excelPreg, excelPreg.name);
    console.log("Cargando Categoria....");
    this.http
      .post<FormData>(`${environment.API}/api/categoria/carga-categoria-excel`, formData, { headers: headers })

      .subscribe((response) => {
        console.log('Archivo  Categorias subido exitosamente', response);
      },
        (error) => {
          console.error('Error al subir el archivo Categorias', error);
        }
      );
  }
  public async CargarPreguntas(excelPreg: File, headers: HttpHeaders) {

    console.log("Cargando Pregunta....");
    const formData = new FormData();
    formData.append('excelPregunta', excelPreg, excelPreg.name);

    this.http
      .post<FormData>(`${environment.API}/api/pregunta/carga-pregunta-excel`, formData, { headers: headers })

      .subscribe((response) => {
        console.log('Archivo Preguntas subido exitosamente', response);
      },
        (error) => {
          console.error('Error al subir el archivo Preguntas', error);
        }
      );
  }
  public async CargarRespuestas(excelPreg: File, headers: HttpHeaders) {

    console.log("Cargando Respuesta...");

    const formData = new FormData();
    formData.append('excelRespuesta', excelPreg, excelPreg.name);

    this.http
      .post<FormData>(`${environment.API}/api/respuesta/carga-respuesta-excel`, formData, { headers: headers })

      .subscribe((response) => {
        console.log('Archivo Respuestas subido exitosamente', response);
      },
        (error) => {
          console.error('Error al subir el archivo Respuestas', error);
        }
      );
  }

}
