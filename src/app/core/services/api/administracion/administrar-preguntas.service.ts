import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/core/environments/environment';
import { Observable, of } from 'rxjs';
import { concatMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdministrarPreguntasService {
  
  constructor(private http: HttpClient) { }

  // Define un observable para la secuencia


  //Verificado Envio, ¿Captura?
  // TODO excelPreg NO ....excelPreguntas SI
  public CargarExcelDePreguntas(excelPreg: File): Observable<any> {
    // TODO llevar esta a funcion privada "configHeaders"
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


  }

  public async CargarSeccion(excelPreg: File, headers: HttpHeaders) {

    const formData = new FormData();
    formData.append('excelSeccion', excelPreg, excelPreg.name);

    return this.http
      .post<FormData>(`${environment.API}/api/seccion/carga-seccion-excel`, formData, { headers: headers })
      // TODO mensaje de error en pantalla
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
    return this.http
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

    return this.http
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

    return this.http
      .post<FormData>(`${environment.API}/api/respuesta/carga-respuesta-excel`, formData, { headers: headers })

      .subscribe((response) => {
        console.log('Archivo Respuestas subido exitosamente', response);
      },
        (error) => {
          console.error('Error al subir el archivo Respuestas', error);
        }
      );
  }

  getExcelTemplate() {
    return this.http.get('/assets/documents/Esquema-Preguntas-De-Perfiles.xlsx', { responseType: 'blob' });
  }


}
