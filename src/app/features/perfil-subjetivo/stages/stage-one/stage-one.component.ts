import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';
import { CuestionarioInitial, Pregunta, Respuesta, convertirAPreguntaBotones, PreguntaBotones } from 'src/app/core/models/initial-profile/initial-profile.model';
import { LocalStorageService } from 'src/app/core/services/LocalStorage/local-storage.service';
// import { Cuestionario, RespuestaBnt } from 'src/app/core/models/initial-profile/questions-profile.model';
import { QuestionsProfileService } from 'src/app/core/services/api/subjective-profile/questions-profile.service';
@Component({
  selector: 'app-stage-one',
  templateUrl: './stage-one.component.html',
  styleUrls: ['./stage-one.component.scss']
})
export class StageOneComponent implements OnInit {

  cuestionario: CuestionarioInitial = {
    preguntas: [],
  };

  resCuestionario: CuestionarioInitial = {
    preguntas: [],
  };

  ///////Control de paginacion. preguntas Siguiente:
  buttonText: string = 'SIGUIENTE PREGUNTA';
  isLastQuestion: boolean = false;
  currentQuestionIndex: number = 0;

  /////////Almacenamiento de las respuestas de las preguntas
  opcionesSeleccionadas: { seccion: string, pregunta: string, valor: number }[] = [];
  opcionSeleccionada: number = 0;
  respuestasSeleccionadasPorInstrumento: Record<string, number> = {};

  /////////Almacenamiento de las respuestas Calculada
  AnalisisSubjetivo: Record<string, number> = {};
  /////////Almacenamiento de las respuestas calculada y perfil obtenido
  respuestasDeUsuario: { seccion: string, calculo: number }[] = [];

  respuestasPerfil: any = [];

  // instrumentoMostrado: boolean = false;

  public testSubjetivo: CuestionarioInitial = {
    preguntas: []
  };
  public PregSubjetivo: CuestionarioInitial = {
    preguntas: []
  };

  constructor(private profileService: QuestionsProfileService,
     private router: Router, private route: ActivatedRoute,
     private localStorageService: LocalStorageService) {
   
  }

  ngOnInit(): void {
    // Solicitud a json local;
    this.loadCuestionario();

    // Solicitud a json API;
    // this.getTestPerfil();
  }
  loadCuestionario() {
    this.profileService.getCuestionario().subscribe((data) => {
      console.log("Test Subjetivo Obtenido");
      console.log(data);
      this.resCuestionario = data;
      this.loadQuestions();
    });
  }

  public getTestPerfil() {
    return this.profileService.obtenerTestSubjetivo()
      .then((testSubjetivo) => {
        this.testSubjetivo.preguntas = testSubjetivo;
        console.log("Servicio a questionario inicial");
        console.log(this.testSubjetivo);
        this.resCuestionario = this.testSubjetivo;
        this.loadQuestions();
      })
      .catch((error) => console.error(error))
  }

  //Inicializa mi objeto con la primer pregunta
  loadQuestions() {

    this.cuestionario.preguntas[0] = this.resCuestionario.preguntas[0];
    //Metodo para consultar a la API
    // this.PregSubjetivo.preguntas[0] = this.testSubjetivo.preguntas[0];
  }

  loadNextQuestion(): void {

    if (this.resCuestionario) {

      this.guardarrespuestas(this.cuestionario.preguntas[0].seccion.nombre,
        this.cuestionario.preguntas[0].TipoComponente);

      // console.log("-Resultado Temporal Guardado");
      // console.log(this.respuestasDeUsuario);
      // Incrementa el índice para la próxima pregunta
      this.currentQuestionIndex++;

      if (this.currentQuestionIndex < this.resCuestionario.preguntas.length) {

        this.cuestionario.preguntas[0] = this.resCuestionario.preguntas[this.currentQuestionIndex];

      }
      else {
        // Si no hay más preguntas, puedes mostrar un mensaje o realizar otra acción

        console.log('Has respondido todas las preguntas.');
        console.log(this.AnalisisSubjetivo);
        console.log('Estos eran tus resultados.');
        this.isLastQuestion = true;// Habilita Control de pregunta finalizada y habilita boton para volver al home
        this.buttonText = 'FINALIZAR';//Podria unificar el loadRoadMap y que sea un control en lugar de cambiar botones
        //REaliza el envio de los resultaos y la espera del resultado guarda en una clase dentro el metodo del servicio el 
        //resultado del test que debe estar disponible prar la proxima componente(o pantalla)
        this.entregarResultados().then((data) => {
          this.respuestasPerfil = data;
          this.profileService.disparadordemensageResultado.emit({
            data:this.respuestasPerfil.perfilInversor
          });
          this.localStorageService.setItem('perfil',this.respuestasPerfil.perfilInversor);
       
          console.log('Entrega de resultados completada.');
        });
      }
    } else {
      console.error('Error: Fin de preguntas válidos- Ultima Vista antes de Volver al home-RoadMap.');
    }
  }

  guardarrespuestas(seccion: string, tipo: string) {
    // Verificar el tipo de pregunta
    let index = -1
    switch (tipo) {
      case 'CHECKBOX':

        // console.log('Suma total:Area CHECKBOX');
        index = this.respuestasDeUsuario.findIndex(respuesta => respuesta.seccion === seccion);
        const valoresCheckbox = this.opcionesSeleccionadas.map(respuesta => respuesta.valor);
        const sumaCheckbox = valoresCheckbox.reduce((total, valor) => total + valor, 0);
        // console.log('Suma total:', sumaCheckbox);
        if (index !== -1) {
          // respuestaExistente.calculo += sumaCheckbox;
          this.respuestasDeUsuario[index].calculo += sumaCheckbox;
        }
        else {
          this.respuestasDeUsuario.push({ seccion, calculo: sumaCheckbox });
        }
        if (!this.AnalisisSubjetivo[seccion]) {
          this.AnalisisSubjetivo[seccion] = 0;
        }
        this.AnalisisSubjetivo[seccion] += sumaCheckbox;
        break;
      case 'RADIO':
        // console.log('Suma total:Area RADIO');
        index = this.respuestasDeUsuario.findIndex(respuesta => respuesta.seccion === seccion);//Horizonte o riesgo
        let valorRadio = this.opcionSeleccionada;

        if (index !== -1) {
          this.respuestasDeUsuario[index].calculo += valorRadio;
        }
        else {

          this.respuestasDeUsuario.push({ seccion, calculo: valorRadio });
        }
        if (!this.AnalisisSubjetivo[seccion]) {
          this.AnalisisSubjetivo[seccion] = 0;
        }
        this.AnalisisSubjetivo[seccion] += valorRadio;
        // console.log(valorRadio);
        break;
      case 'BOTON':
        // console.log('Suma total:Area BOTON');
        index = this.respuestasDeUsuario.findIndex(respuesta => respuesta.seccion === seccion);
        let suma = 0;
        // console.log("Puntaje por respuestas");
        // console.log(this.respuestasSeleccionadasPorInstrumento);
        for (const instrumento in this.respuestasSeleccionadasPorInstrumento) {
          if (this.respuestasSeleccionadasPorInstrumento.hasOwnProperty(instrumento)) {
            suma += this.respuestasSeleccionadasPorInstrumento[instrumento];
          }
        }
        // console.log('Suma total:', suma);
        if (index !== -1) {
          this.respuestasDeUsuario[index].calculo += suma;
        }
        else {

          this.respuestasDeUsuario.push({ seccion, calculo: suma });
        }
        if (!this.AnalisisSubjetivo[seccion]) {
          this.AnalisisSubjetivo[seccion] = 0;
        }
        this.AnalisisSubjetivo[seccion] += suma;
        break;
      default:
        // Tipo de pregunta no reconocido
        console.error('Tipo de pregunta no reconocido-para valorizar respuesta');
        break;
    }
    this.opcionesSeleccionadas = [];
  }

  /**********Post de resultados almacenados**********/

  public async entregarResultados(): Promise<void> {
    if (!this.validateData()) {
      return;
    }

    try {
      console.log("Enviando Resultados...");
      const data = await from(this.profileService.TestSubjetivoResultados(this.AnalisisSubjetivo)).toPromise();

      if (data && data.perfilInversor) {
        this.respuestasPerfil = data;
        console.log("Resultados enviados correctamente");
        return this.respuestasPerfil;
      } else {
        console.error('No se recibió una respuesta válida de la API.');
        // Maneja el error como sea necesario
      }
    } catch (error) {
      console.error('Error al enviar los resultados:', error);
      // Maneja el error como sea necesario
    }
  }

  validateData() {
    return true;
  }

  actualizarOpcionesSeleccionadas(seccion: string, pregunta: string, valor: number) {

    // SE actualiza para el cadso de los raidus(unica opcion)
    this.opcionSeleccionada = valor;

    const index = this.opcionesSeleccionadas.findIndex(opcion => opcion.pregunta === pregunta && opcion.valor === valor);
    if (index !== -1) {
      // Eliminar la opción no seleccionada del arreglo de opciones seleccionadas
      this.opcionesSeleccionadas.splice(index, 1);

    } else {
      // Si noesta en el grupo de opciones ingresadas se guarda
      this.opcionesSeleccionadas.push({ seccion, pregunta, valor }); if (index !== -1) {
      }
    }
  }

  actualizarOpcionesSeleccionadasBotonInstrumento(seccion: string, instrumento: string, valor: number) {
    // Almacena la respuesta seleccionada para este instrumento.
    this.respuestasSeleccionadasPorInstrumento[instrumento] = valor;

    // console.log(this.respuestasSeleccionadasPorInstrumento);

  }

  esRespuestaSeleccionada(instrumento: string, valor: number): boolean {
    return this.respuestasSeleccionadasPorInstrumento[instrumento] === valor;
  }

  isArray(respuestas: Respuesta[]): respuestas is Respuesta[] {
    return Array.isArray(respuestas);
  }

  loadPageResultado(): void {
    this.router.navigate(['/perfil-inversor-resultado']);
    this.buttonText = 'Continuar';
  }

  //Obtiene el refactor de preguntas de botones para que sea visibles
  opcionesPorInstrumento(respuestasbnts: Respuesta[], instrumento: string): any[] {
    // Filtrar y ordenar las opciones por instrumento y orden
    // console.log("Funciones unificar respuestas");
    return respuestasbnts
      .filter((respuestasbnts) => respuestasbnts.instrumento === instrumento)
      .sort((a: { orden: number; }, b: { orden: number; }) => a.orden - b.orden);
  }

  esPrimero(respuestasbnts: Respuesta) {
    return respuestasbnts.orden == 1;
  }

 

}




