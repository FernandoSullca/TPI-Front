import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';
import { CuestionarioInitial, Pregunta, Respuesta, convertirAPreguntaBotones, PreguntaBotones } from 'src/app/core/models/initial-profile/initial-profile.model';
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
  buttonText: string = 'Siguiente Pregunta';
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

  constructor(private profileService: QuestionsProfileService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Solicitud a json local;
    this.profileService.getCuestionario().subscribe((data) => {
      console.log("data");
      console.log(data);
      console.log("------------------");
      this.resCuestionario = data;
      this.loadQuestions();
    });
    // this.getTestPerfil();
  }

  public testSubjetivo: CuestionarioInitial = {
    preguntas: []
  };
  public PregSubjetivo: CuestionarioInitial = {
    preguntas: []
  };

  public getTestPerfil() {
    return this.profileService.obtenerTestSubjetivo()
      .then((testSubjetivo) => {
        // this.testSubjetivo.preguntas = testSubjetivo;
        console.log("Servicio a questionario inicial");
        console.log(this.testSubjetivo);
      })
      .catch((error) => console.error(error))
  }


  loadQuestions() {

    this.cuestionario.preguntas[0] = this.resCuestionario.preguntas[0];

    //Filtrado para armar las preguntas multiples/opciones-respuestas
    const preguntaFiltrada = this.filtrarPreguntasCompuestasBTN(this.resCuestionario);
    if (preguntaFiltrada) {
      const questions = this.convertirPreguntaBotones(preguntaFiltrada[0]);
      // console.log("    const questions=this.convertirPreguntaBotones(preguntaFiltrada[0]);");
      // console.log(questions);
      // console.log("------------------");
    }
    this.PregSubjetivo.preguntas[0] = this.testSubjetivo.preguntas[0];
    console.log("this.PregSubjetivo");
    console.log(this.PregSubjetivo);
    console.log("------------------");
    console.log(this.AnalisisSubjetivo);
    console.log("------------------");
  }

  loadNextQuestion(): void {

    if (this.resCuestionario) {

      this.guardarrespuestas(this.cuestionario.preguntas[0].seccion.nombre,
        this.cuestionario.preguntas[0].TipoComponente);

      console.log("-Resultado Guradado");
      console.log(this.respuestasDeUsuario);

      console.log(this.AnalisisSubjetivo);
      // Incrementa el índice para la próxima pregunta
      this.currentQuestionIndex++;

      if (this.currentQuestionIndex < this.resCuestionario.preguntas.length) {

        this.cuestionario.preguntas[0] = this.resCuestionario.preguntas[this.currentQuestionIndex];

      } else {
        // Si no hay más preguntas, puedes mostrar un mensaje o realizar otra acción
        console.log('Has respondido todas las preguntas.');
        this.isLastQuestion = true;// Habilita Control de pregunta finalizada y habilita boton para volver al home
        this.buttonText = 'Continuar';//Podria unificar el loadRoadMap y que sea un control en lugar de cambiar botones
        // this.entregarResultados()
        this.entregarResultados().then(() => {
         
        });
      }
    } else {
      console.error('Error: Fin de preguntas válidos- Ultima Vista antes de Volver al home-RoadMap.');
    }
  }
  isArray(respuestas: Respuesta[]): respuestas is Respuesta[] {
    return Array.isArray(respuestas);
  }

  // isArraybnt(respuestas: RespuestaBnt[]): respuestas is RespuestaBnt[] {
  //   return Array.isArray(respuestas);
  // }

  // isArraybntist(respuestas: RespuestaBnt[]): respuestas is RespuestaBnt[] {
  //   return Array.isArray(respuestas);
  // }

  // actualizarOpcionesSeleccionadas(seccion: string, pregunta: string, valor: number, seleccionada: boolean) {

  //   this.opcionSeleccionada=valor;
  //   if (seleccionada) {
  //     this.opcionesSeleccionadas.push({ seccion, pregunta, valor });
  //   } else {
  //     // Eliminar la opción no seleccionada del arreglo de opciones seleccionadas
  //     const index = this.opcionesSeleccionadas.findIndex(opcion => opcion.pregunta === pregunta && opcion.valor === valor);
  //     if (index !== -1) {
  //       this.opcionesSeleccionadas.splice(index, 1);
  //     }
  //   }
  // }

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

  guardarrespuestas(seccion: string, tipo: string) {
    // Verificar el tipo de pregunta
    let index = -1
    switch (tipo) {
      case 'CHECKBOX':


        index = this.respuestasDeUsuario.findIndex(respuesta => respuesta.seccion === seccion);
        const valoresCheckbox = this.opcionesSeleccionadas.map(respuesta => respuesta.valor);
        const sumaCheckbox = valoresCheckbox.reduce((total, valor) => total + valor, 0);
        console.log('Suma total:', sumaCheckbox);
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

        index = this.respuestasDeUsuario.findIndex(respuesta => respuesta.seccion === seccion);//Horizonte o riesgo
        let valorRadio = this.opcionSeleccionada;
        console.log('Suma total:', valorRadio);
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
        break;
      case 'BOTON':
        index = this.respuestasDeUsuario.findIndex(respuesta => respuesta.seccion === seccion);
        let suma = 0;
        console.log(this.respuestasSeleccionadasPorInstrumento);
        for (const instrumento in this.respuestasSeleccionadasPorInstrumento) {
          if (this.respuestasSeleccionadasPorInstrumento.hasOwnProperty(instrumento)) {
            suma += this.respuestasSeleccionadasPorInstrumento[instrumento];
          }
        }
        console.log('Suma total:', suma);
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

  loadResultado(): void {
  //  this.entregarResultados()
      // this.entregarResultados();
      console.log("Verificar las repuesta en el componente");
      console.log(this.respuestasPerfil.perfilInversorl);
      console.log("--------");
      // const valorParaEnviar = this.respuestasPerfil.perfilInversorl;

      // this.router.navigate(['/perfil-inversor-resultado/', {perfil:valorParaEnviar}]);
      // this.profileService.setperfil(this.respuestasPerfil.perfilInversorl);
      this.router.navigate(['/perfil-inversor-resultado']);
      this.buttonText = 'Continuar';

  }

  loadHome(): void {
    // this.entregarResultados() ;
    this.router.navigate(['/dashboard/perfil-inversor']);
    this.buttonText = 'Continuar';
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
        console.log(this.respuestasPerfil.perfilInversor);
        this.profileService.setperfil(this.respuestasPerfil.perfilInversorl);
      } else {
        console.error('No se recibió una respuesta válida de la API.');
        // Maneja el error como sea necesario
      }
    } catch (error) {
      console.error('Error al enviar los resultados:', error);
      // Maneja el error como sea necesario
    }
  }

  // public entregarResultados() {
  //   if (!this.validateData()) {

  //     return false;
  //   }
  //   console.log("Enviando--- Resultados");
  //   return this.profileService.TestSubjetivoResultados(this.AnalisisSubjetivo)
  //     .then((data) => {
  //       this.respuestasPerfil = data;
  //       console.log(data)
  //       console.log("Enviado");
  //       console.log(this.respuestasPerfil);
  //       console.log(this.respuestasPerfil.perfilInversor);
  //       this.profileService.setperfil(this.respuestasPerfil.perfilInversorl);
  //     })
  //     .catch((error) => {

  //       console.error(error)
  //     })
  // }

  validateData() {
    return true;
  }

  filtrarPreguntasCompuestasBTN(cuestionario: CuestionarioInitial): Pregunta[] {

    // Filtrar las preguntas de tipo "Boton" que tienen un instrumento no nulo
    const preguntasBotonConInstrumento: Pregunta[] = cuestionario.preguntas.filter((pregunta) => {
      return pregunta.TipoComponente === 'BOTON' && pregunta.respuestas[0]?.instrumento !== null;
    });

    return preguntasBotonConInstrumento;

  }
  // Nueva función para convertir pregunta a preguntaBotones
  convertirPreguntaBotones(pregunta: Pregunta): PreguntaBotones {

    return convertirAPreguntaBotones(pregunta);
  }

  instrumentoMostrado: boolean = false;
  //Obtiene 
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

  // getInstrumentosUnicos(respuestas: Respuesta[]): string[] {
  //   const instrumentosUnicos = new Set<string>();

  //   respuestas.forEach((respuesta) => {
  //     instrumentosUnicos.add(respuesta.instrumento);
  //   });

  //   return Array.from(instrumentosUnicos);
  // }
}




