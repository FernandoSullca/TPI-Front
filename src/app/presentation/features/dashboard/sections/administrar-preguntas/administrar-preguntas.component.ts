import { Component, ElementRef, ViewChild } from '@angular/core';
import { AdministrarPreguntasService } from 'src/app/core/services/api/administracion/administrar-preguntas.service';
import { NgbProgressbar, NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/core/services/LocalStorage/local-storage.service';
import { jwtDecode } from "jwt-decode";
@Component({
  selector: 'app-administrar-preguntas',
  templateUrl: './administrar-preguntas.component.html',
  styleUrls: ['./administrar-preguntas.component.scss']
})

export class AdministrarPreguntasComponent {



  selectedFile: File | null = null;
  selectedFileSeccion: File | null = null;
  selectedFileCategoria: File | null = null;
  selectedFilePregunta: File | null = null;
  selectedFileRespuesta: File | null = null;
  selectedFileName: string = 'Nombre del archivo: No seleccionado';
  uploadProgress: number = 0;
  uploadProgressSecciones: number = 0;
  uploadProgressCategorias: number = 0;
  uploadProgressPreguntas: number = 0;
  uploadProgressRespuestas: number = 0;
  typeProgress: string = "primary";
  typeProgressSecciones: string = "primary";
  typeProgressCategorias: string = "primary";
  typeProgressPreguntas: string = "primary";
  typeProgressRespuesta: string = "primary";

  errorTipo: string = "";

  constructor(private servicioPreguntasAPI_: AdministrarPreguntasService,
    private configBar: NgbProgressbarConfig,
    private router: Router,
    private LocalStorageService: LocalStorageService) {

  }
  @ViewChild('fileInput') fileInput: ElementRef | undefined;
  // selectedFile: File | null = null;
  formattedSize: string = 'Tamaño no disponible';
  formattedType: string = 'Tipo no disponible';
  formattedLastModified: string = 'Última modificación no disponible';

  ngOnInit(): void {
    this.verificarAdministracion();
    }
  
    verificarAdministracion(){
      let token = this.LocalStorageService.getItem("token");
      const tokenDecoded: any = { ...jwtDecode(token) };
      if (!tokenDecoded.esAdministrador) {
        this.loadHome();
        return;
      }
    }
  
    loadHome() {
      this.router.navigate(['/login']);
    }

  openFileInput() {
    if (this.fileInput) {
      this.fileInput.nativeElement.click();
    }

  }
  ///Seleccion Arrastrar y soltar
  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0];
    if (file) {
      this.selectedFileSeccion = file;
      this.selectedFileCategoria = file;
      this.selectedFilePregunta = file;
      this.selectedFileRespuesta = file;
      this.selectedFile = file;
      this.selectedFileName = `Nombre del archivo: ${file.name}`;

    } else {
      this.selectedFile = null;
      this.selectedFileName = 'Nombre del archivo: No seleccionado';
    }
  }

  /***************************** */
  onFileSelectedSecciones(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0];
    this.asignacionDeArchivo(file);
    // this.selectedFileSeccion=file;


  }


  onFileSelectedCategorias(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0];
    this.asignacionDeArchivo(file);
    // this.selectedFileCategoria= null;

  }

  onFileSelectedPreguntas(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0];
    this.asignacionDeArchivo(file);
    // this.selectedFilePregunta= null;
  }

  onFileSelectedRespuestas(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0];
    this.asignacionDeArchivo(file);
    // this.selectedFileRespuesta= null;
  }

  private asignacionDeArchivo(file: File | undefined) {
    if (file) {
      this.selectedFile = file;
      this.selectedFileSeccion = file;
      this.selectedFileCategoria = file;
      this.selectedFilePregunta = file;
      this.selectedFileRespuesta = file;
      console.log(`Nombre del archivo: ${file.name}`);
      this.construirDatosTabla(file);
    }
    else {
      this.selectedFile = null;
      this.selectedFileSeccion = null;
      this.selectedFileCategoria = null;
      this.selectedFilePregunta = null;
      this.selectedFileRespuesta = null;
      this.selectedFileName = 'Nombre del archivo: No seleccionado';
    }
  }

  private construirDatosTabla(file: File) {
    if (file.size !== undefined) {
      this.formattedSize = `${(file.size / 1024 / 1024).toPrecision(2)} MB`;
    }
    if (file.type !== undefined) {
      const extension = file.name.split('.').pop();
      console.log(`Extensión del archivo: ${extension}`);
      // this.formattedType = file.type;

      this.formattedType = extension !== undefined ? extension : 'Tipo no disponible';

    }
    if (file.lastModified !== undefined) {
      this.formattedLastModified = new Date(file.lastModified).toLocaleDateString();
    }
  }

  uploadFileSecciones() {
    this.errorTipo = "";
    if (this.selectedFile) {

      // Simula la carga del archivo y actualiza la barra de progreso
      this.servicioPreguntasAPI_.CargarSeccionesExcel(this.selectedFile).subscribe(
        (data) => {
          this.uploadProgressSecciones = 100;
          this.typeProgressSecciones = "success"
          this.configBar.type = "success";
          this.configBar.animated = true;
        },
        (error) => {
          console.error('Error en la carga de datos', error);
          console.info(error.error.message);
          this.errorTipo = error.error.message;
          this.uploadProgressSecciones = 50;
          this.typeProgressSecciones = "danger"
        }
      );

    }

    if (!this.selectedFile) {
      alert('Por favor, seleccione un archivo antes de cargarlo.');
    }

  }

  uploadFileCategorias() {
    this.errorTipo = "";
    if (this.selectedFile) {

      this.servicioPreguntasAPI_.CargarCategoriasExcel(this.selectedFile).subscribe(
        (data) => {
          this.uploadProgressCategorias = 100;
          this.typeProgressCategorias = "success"
          this.configBar.type = "success";
          this.configBar.animated = true;
        },
        (error) => {
          console.error('Error en la carga de datos', error);
          console.info(error.error.message);
          this.errorTipo = error.error.message;
          this.uploadProgressCategorias = 50;
          this.typeProgressCategorias = "danger"
        }
      );

    }

    if (!this.selectedFile) {
      alert('Por favor, seleccione un archivo antes de cargarlo.');
    }

  }

  uploadFilePreguntas() {
    this.errorTipo = "";
    if (this.selectedFile) {

      this.servicioPreguntasAPI_.CargarPreguntasExcel(this.selectedFile).subscribe(
        (data) => {
          this.uploadProgressPreguntas = 100;
          this.typeProgressPreguntas = "success"
          this.configBar.type = "success";
          this.configBar.animated = true;
        },
        (error) => {
          console.error('Error en la carga de datos', error);
          console.info(error.error.message);
          this.errorTipo = error.error.message;
          this.uploadProgressPreguntas = 50;
          this.typeProgressPreguntas = "danger"
        }
      );

    }

    if (!this.selectedFile) {
      alert('Por favor, seleccione un archivo antes de cargarlo.');
    }

  }

  uploadFileRespuestas() {
    this.errorTipo = "";
    if (this.selectedFile) {
      this.servicioPreguntasAPI_.CargarRespuestasExcel(this.selectedFile).subscribe(
        (data) => {
          this.uploadProgressRespuestas = 100;
          this.typeProgressRespuesta = "success"
          this.configBar.type = "success";
          this.configBar.animated = true;
          // }
        },
        (error) => {
          console.error('Error en la carga de datos', error);
          console.info(error.error.message);
          this.errorTipo = error.error.message;
          this.uploadProgressRespuestas = 50;
          this.typeProgressRespuesta = "danger"

        }
      );

    }

    if (!this.selectedFile) {
      alert('Por favor, seleccione un archivo antes de cargarlo.');
    }

  }

  RemoveFile(file: string) {
    switch (file) {
      case 'Secciones':
        this.selectedFileSeccion = null;

        break;
      case 'Categorias':
        this.selectedFileCategoria = null;

        break;
      case 'Preguntas':
        this.selectedFilePregunta = null;

        break;
      case 'Respuestas':
        this.selectedFileRespuesta = null;
        break;
    }

  }

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

  loadAdministracion() {
    this.router.navigate(['/dashboard/administrar']);

  }

}
