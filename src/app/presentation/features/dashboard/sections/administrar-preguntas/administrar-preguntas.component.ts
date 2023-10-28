import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { AdministrarPreguntasService } from 'src/core/services/api/administracion/administrar-preguntas.service';

@Component({
  selector: 'app-administrar-preguntas',
  templateUrl: './administrar-preguntas.component.html',
  styleUrls: ['./administrar-preguntas.component.scss']
})
export class AdministrarPreguntasComponent {

  selectedFile: File | null = null;
  selectedFileName: string = 'Nombre del archivo: No seleccionado';
  uploadProgress: number = 0;
  resp: any = null;

  constructor(private http: HttpClient, private servicioPreguntasAPI_: AdministrarPreguntasService) { }

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


      this.servicioPreguntasAPI_.CargarExcelDePreguntas(this.selectedFile).subscribe(
        () => {
          console.log('Todas las solicitudes se completaron con éxito');
          // Puedes realizar acciones adicionales aquí
        },
        (error) => {
          console.error('Error en la carga de datos', error);
          // Puedes manejar el error y mostrar un mensaje al usuario
        }
      );

    } else {
      alert('Por favor, seleccione un archivo antes de cargarlo.');
    }
    if (this.resp != null) {

      this.uploadProgress = 100;
    }

  }


}
