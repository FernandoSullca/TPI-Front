import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalComponent } from 'src/app/common/modal/modal/modal.component';
import { Cuestionario, Respuesta, RespuestaBnt } from 'src/app/core/models/initial-profile/questions-profile.model';
import { QuestionsProfileService } from 'src/app/core/services/api/subjective-profile/questions-profile.service';
@Component({
  selector: 'app-stage-one',
  templateUrl: './stage-one.component.html',
  styleUrls: ['./stage-one.component.scss']
})
export class StageOneComponent implements OnInit {

  @ViewChild(ModalComponent) modal?: ModalComponent;
  mensajeFinalizacion:String="¡Cambiando mensaje de prueba!";
  
  cuestionario: Cuestionario = {
    preguntas: [],
  };

  resCuestionario: Cuestionario = {
    preguntas: [],
  };

  buttonText: string = 'Siguiente Pregunta';
  isLastQuestion: boolean = false;
  currentQuestionIndex: number = 0;

  opcionesSeleccionadas: { seccion: string, pregunta: string, valor: number }[] = [];
  opcionSeleccionada: number = 0;
  respuestasSeleccionadasPorInstrumento: Record<string, number> = {};

  AnalisisSubjetivo: Record<string, number> = {  };
  respuestasDeUsuario: { seccion: string, calculo: number }[] = [];

  constructor(private profileService: QuestionsProfileService, private router: Router) { }

  ngOnInit(): void {
    this.profileService.getCuestionario().subscribe((data) => {
      this.resCuestionario = data;
      this.loadQuestions();
    });
  }

  loadQuestions() {

    this.cuestionario.preguntas[0] = this.resCuestionario.preguntas[0];

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
      }
    } else {
      console.error('Error: Fin de preguntas válidos- Ultima Vista antes de Volver al home-RoadMap.');
    }
  }
  isArray(respuestas: Respuesta[]): respuestas is Respuesta[] {
    return Array.isArray(respuestas);
  }

  isArraybnt(respuestas: RespuestaBnt[]): respuestas is RespuestaBnt[] {
    return Array.isArray(respuestas);
  }

  isArraybntist(respuestas: RespuestaBnt[]): respuestas is RespuestaBnt[] {
    return Array.isArray(respuestas);
  }

  actualizarOpcionesSeleccionadas(seccion: string, pregunta: string, valor: number, seleccionada: boolean) {
  
    this.opcionSeleccionada=valor;
    if (seleccionada) {
      this.opcionesSeleccionadas.push({ seccion, pregunta, valor });
    } else {
      // Eliminar la opción no seleccionada del arreglo de opciones seleccionadas
      const index = this.opcionesSeleccionadas.findIndex(opcion => opcion.pregunta === pregunta && opcion.valor === valor);
      if (index !== -1) {
        this.opcionesSeleccionadas.splice(index, 1);
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
      case 'checkbox':

      
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
      case 'radio':
  
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
      case 'boton':
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
        this.AnalisisSubjetivo[seccion] +=suma;
        break;
      default:
        // Tipo de pregunta no reconocido
        console.error('Tipo de pregunta no reconocido');
        break;
    }
    this.opcionesSeleccionadas = [];
  }

  loadResultado(): void {
    this.entregarResultados() ;
    this.router.navigate(['/perfil-inversor-resultado']);
    this.buttonText = 'Continuar';
  }
  
  loadHome(): void {
    // this.entregarResultados() ;
    this.router.navigate(['/dashboard/perfil-inversor']);
    this.buttonText = 'Continuar';
  }

 /**********Post de resultados almacenados**********/ 
 public entregarResultados() {
    if (!this.validateData()) {

      return false;
    }
    return this.profileService.TestSubjetivoResultados(this.AnalisisSubjetivo)
      .then(() => {
        console.log("Enviado");
      })
      .catch((error) => {
  
        console.error(error)
      })
  }

  validateData() {
  return true;
  }
  

}




