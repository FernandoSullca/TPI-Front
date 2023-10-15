import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';
import { LocalStorageService } from 'src/app/core/services/LocalStorage/local-storage.service';
import { PreguntaApi, RespuestaAPI } from 'src/app/core/models/API/Pregunta-APi.model';
import { QuestionsProfileService } from 'src/app/core/services/api/subjective-profile/questions-profile.service';
import { PreguntaSubjetivasService } from 'src/app/core/services/dataLocalSercices/Preguntas-Subjetivas/preguntaSubjetiva.service';
@Component({
  selector: 'app-stage-one',
  templateUrl: './stage-one.component.html',
  styleUrls: ['./stage-one.component.scss']
})
export class StageOneComponent implements OnInit {

  resCuestionarioAPI: PreguntaApi[] = [];

  resPreguntaSubjetivaAPI: PreguntaApi[] = [];

  cuestionario: PreguntaApi[] = [];

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

  constructor(private profileServiceAPI_: QuestionsProfileService,
    private preguntaSubjetivasServiceLocal_: PreguntaSubjetivasService,
    private router: Router, private route: ActivatedRoute,
    private localStorageService: LocalStorageService) {

  }

  ngOnInit(): void {

    this.profileServiceAPI_.obtenerTestSubjetivo()
      .then((testSubjetivo) => {
        this.resCuestionarioAPI = testSubjetivo;
        //Si vino VAcio y quiero buscar en mi local
        console.log(this.resCuestionarioAPI)
        if (this.resCuestionarioAPI) {
          console.log("Buscando en local Host")
          this.loadQuestionsFromLocal()
        }
        else {
          this.loadQuestions();
        }
      })
      .catch(
        (error) => {
          console.error("Error al obtener datos del API:", error),
            this.loadQuestionsFromLocal()
        })
      .finally(() => {

      }
      );
  }

  public loadQuestionsFromLocal() {
    return this.preguntaSubjetivasServiceLocal_.getCuestionario()
      .subscribe(
        (testSubjetivo) => {
          this.resCuestionarioAPI = testSubjetivo;
          this.loadQuestions();
        },
        (error) => console.error(error))
  }

  loadQuestions() {
    console.log("----------Cargar Primer Pregunta-------");
    this.cuestionario[0] = this.resCuestionarioAPI[0];
    console.log(this.cuestionario[0]);
  }

  loadNextQuestion(): void {

    if (this.resCuestionarioAPI) {

      this.guardarrespuestas(this.cuestionario[0].seccion.nombre,
        this.cuestionario[0].tipoComponente);
      //   // Incrementa el índice para la próxima pregunta
      this.currentQuestionIndex++;

      if (this.currentQuestionIndex < this.resCuestionarioAPI.length) {

        this.cuestionario[0] = this.resCuestionarioAPI[this.currentQuestionIndex];
      }
      else {
        // Si no hay más preguntas, puedes mostrar un mensaje o realizar otra acción
        this.isLastQuestion = true;// Habilita Control de pregunta finalizada y habilita boton para volver al home
        this.buttonText = 'FINALIZAR';//Podria unificar el loadRoadMap y que sea un control en lugar de cambiar botones
        //     //REaliza el envio de los resultaos y la espera del resultado guarda en una clase dentro el metodo del servicio el 
        //     //resultado del test que debe estar disponible prar la proxima componente(o pantalla)
        this.entregarResultados().then((data) => {
          this.respuestasPerfil = data;
          this.localStorageService.setItem('toleranciaRiesgo', this.respuestasPerfil.toleranciaRiesgo);
          this.localStorageService.setItem('horizonteTemporal', this.respuestasPerfil.horizonteTemporal);
          this.localStorageService.setItem('perfil', this.respuestasPerfil.perfilInversor);

          console.log('Entrega de resultados completada.');
        });
      }
    }
    else {
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
      const data = await from(this.profileServiceAPI_.TestSubjetivoResultados(this.AnalisisSubjetivo)).toPromise();

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

  validateData(): boolean {

    return Object.keys(this.AnalisisSubjetivo).length > 0;
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
    
    this.respuestasSeleccionadasPorInstrumento[instrumento] = valor;

  }

  esRespuestaSeleccionada(instrumento: string, valor: number, order: number): boolean {
    return this.respuestasSeleccionadasPorInstrumento[instrumento] === valor;
  }

  isArray(respuestas: RespuestaAPI[]): respuestas is RespuestaAPI[] {
    return Array.isArray(respuestas);
  }

  loadPageResultado(): void {
    this.router.navigate(['/perfil-inversor-resultado']);
    this.buttonText = 'Continuar';
  }

  //Obtiene el refactor de preguntas de botones para que sea visibles
  opcionesPorInstrumento(respuestasbnts: RespuestaAPI[], instrumento: string): any[] {
    // Filtrar y ordenar las opciones por instrumento y orden
    // console.log("Funciones unificar respuestas");
    return respuestasbnts
      .filter((respuestasbnts) => respuestasbnts.instrumento === instrumento)
      .sort((a: { orden: number; }, b: { orden: number; }) => a.orden - b.orden);
  }

  esPrimero(respuestasbnts: RespuestaAPI) {
    return respuestasbnts.orden == 1;
  }


}




