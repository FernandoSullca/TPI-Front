import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-administrar-preguntas',
  templateUrl: './administrar-preguntas.component.html',
  styleUrls: ['./administrar-preguntas.component.scss']
})
export class AdministrarPreguntasComponent {

  selectedFile: File | null = null;
  selectedFileName: string = 'Nombre del archivo: No seleccionado';
  uploadProgress: number = 0;

  constructor(private http: HttpClient) { }

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0];
    if (file) {
      this.selectedFile = file;
      this.selectedFileName = `Nombre del archivo: ${file.name}`;
    } else {
      this.selectedFile = null;
      this.selectedFileName = 'Nombre del archivo: No seleccionado';
    }
  }

  uploadFile() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);


      const headers = new HttpHeaders(); // Importa HttpHeaders desde '@angular/common/http'
      headers.append('Content-Type', 'multipart/form-data'); // Configura el encabezado 'Content-Type'

      // this.http
      //   .post("http://localhost:8080/api/pregunta/carga-pregunta-excel", formData)

      //   .subscribe((response) => {
      //     console.log('Archivo subido exitosamente', response);
      //   });

      this.http
        .post("http://localhost:8080/api/respuesta/carga-respuesta-excel", formData, { headers: headers })

        .subscribe((response) => {
          console.log('Archivo subido exitosamente', response);
        },  
          (error) => {
            console.error('Error al subir el archivo', error);
          }
        );
    } else {
      alert('Por favor, seleccione un archivo antes de cargarlo.');
    }
  }
}
