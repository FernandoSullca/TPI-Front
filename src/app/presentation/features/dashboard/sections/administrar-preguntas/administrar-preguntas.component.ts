import { Component, ElementRef, ViewChild } from '@angular/core';
import { AdministrarPreguntasService } from 'src/app/core/services/api/administracion/administrar-preguntas.service';

@Component({
  selector: 'app-administrar-preguntas',
  templateUrl: './administrar-preguntas.component.html',
  styleUrls: ['./administrar-preguntas.component.scss']
})

export class AdministrarPreguntasComponent {

  downloadExcelTemplate() {
    this.servicioPreguntasAPI_.getExcelTemplate().subscribe((data) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'templatePreguntas.xlsx';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }

  selectedFile: File | null = null;
  selectedFileSeccion: File | null = null;
  selectedFileName: string = 'Nombre del archivo: No seleccionado';
  uploadProgress: number = 0;
  resp: any = null;

  constructor(private servicioPreguntasAPI_: AdministrarPreguntasService) { }
  @ViewChild('fileInput') fileInput: ElementRef | undefined;
  // selectedFile: File | null = null;

  openFileInput() {
    if (this.fileInput) {
      this.fileInput.nativeElement.click();
    }
  }
  formattedSize: string = 'Tamaño no disponible';
  formattedType: string = 'Tipo no disponible';
  formattedLastModified: string = 'Última modificación no disponible';

  onFileSelectedSecciones(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0];
    console.log(file)
    if (file) {
      this.selectedFile = file;
      console.log(`Nombre del archivo: ${file.name}`);
      // Puedes realizar otras operaciones con el archivo aquí
      // Formatear los valores
      if (file.size !== undefined) {
        this.formattedSize = `${(file.size / 1024 / 1024).toPrecision(2)} MB`;
        console.log(this.formattedSize)
      }
      if (file.type !== undefined) {
        this.formattedType = file.type ;
        console.log(this.formattedType)
      }
      if (file.lastModified !== undefined) {
        this.formattedLastModified = new Date(file.lastModified).toLocaleDateString();
        console.log(this.formattedLastModified )
      }
    }
    else {
      this.selectedFile = null;
      this.selectedFileName = 'Nombre del archivo: No seleccionado';
    }
  }

  onFileSelectedCategorias(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0];
    console.log(file)
    if (file) {
      this.selectedFile = file;
      console.log(`Nombre del archivo: ${file.name}`);
      // Puedes realizar otras operaciones con el archivo aquí
      // Formatear los valores
      if (file.size !== undefined) {
        this.formattedSize = `${(file.size / 1024 / 1024).toPrecision(2)} MB`;
        console.log(this.formattedSize)
      }
      if (file.type !== undefined) {
        this.formattedType = file.type ;
        console.log(this.formattedType)
      }
      if (file.lastModified !== undefined) {
        this.formattedLastModified = new Date(file.lastModified).toLocaleDateString();
        console.log(this.formattedLastModified )
      }
    }
    else {
      this.selectedFile = null;
      this.selectedFileName = 'Nombre del archivo: No seleccionado';
    }
  }

  onFileSelectedPreguntas(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0];
    console.log(file)
    if (file) {
      this.selectedFile = file;
      console.log(`Nombre del archivo: ${file.name}`);
      // Puedes realizar otras operaciones con el archivo aquí
      // Formatear los valores
      if (file.size !== undefined) {
        this.formattedSize = `${(file.size / 1024 / 1024).toPrecision(2)} MB`;
        console.log(this.formattedSize)
      }
      if (file.type !== undefined) {
        this.formattedType = file.type ;
        console.log(this.formattedType)
      }
      if (file.lastModified !== undefined) {
        this.formattedLastModified = new Date(file.lastModified).toLocaleDateString();
        console.log(this.formattedLastModified )
      }
    }
    else {
      this.selectedFile = null;
      this.selectedFileName = 'Nombre del archivo: No seleccionado';
    }
  }

  onFileSelectedRespuestas(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0];
    console.log(file)
    if (file) {
      this.selectedFile = file;
      console.log(`Nombre del archivo: ${file.name}`);
      // Puedes realizar otras operaciones con el archivo aquí
      // Formatear los valores
      if (file.size !== undefined) {
        this.formattedSize = `${(file.size / 1024 / 1024).toPrecision(2)} MB`;
        console.log(this.formattedSize)
      }
      if (file.type !== undefined) {
        this.formattedType = file.type ;
        console.log(this.formattedType)
      }
      if (file.lastModified !== undefined) {
        this.formattedLastModified = new Date(file.lastModified).toLocaleDateString();
        console.log(this.formattedLastModified )
      }
    }
    else {
      this.selectedFile = null;
      this.selectedFileName = 'Nombre del archivo: No seleccionado';
    }
  }

  getShortFileType(fileType: string): string {
    // Realiza la conversión según tus necesidades
    // Aquí puedes personalizar la lógica para abreviar el tipo de archivo
    // Por ejemplo, puedes buscar la extensión y mostrarla
   
    const extension = fileType.split('/').pop();
    return extension || fileType; // Si no se encuentra la extensión, muestra el tipo completo
    
  }
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

      // Simula la carga del archivo y actualiza la barra de progreso
      const totalSize = this.selectedFile.size;
      const chunkSize = 1024 * 1024; // Tamaño del fragmento (1 MB en este ejemplo)
      let loaded = 0;

      const uploadInterval = setInterval(() => {
        if (loaded >= totalSize) {
          clearInterval(uploadInterval);
          return;
        }

        loaded += chunkSize;
        this.uploadProgress = (loaded / totalSize) * 100;
      }, 1000); // Actualiza la barra de progreso cada segundo


      this.servicioPreguntasAPI_.CargarExcelDePreguntas(this.selectedFile).subscribe(
        (data) => {
          this.resp = data;
          console.log('Todas las solicitudes se completaron con éxito');
          // Puedes realizar acciones adicionales aquí 
          if (this.resp != null) {
            this.uploadProgress = 100;
          }
        },
        (error) => {
          console.error('Error en la carga de datos', error);
          // Puedes manejar el error y mostrar un mensaje al usuario
        }
      );

    }

    if (!this.selectedFile) {
      alert('Por favor, seleccione un archivo antes de cargarlo.');
    }

  }


}
