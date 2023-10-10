import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionsTargetService } from 'src/app/core/services/api/target-profile/questions-target-profile.service';
import { Pregunta, Respuesta,RespuestaBnt  } from 'src/app/core/models/perfil-objetivo/preguntaObjetivo.model';
import { PreguntaService } from 'src/app/core/services/api/DataLocalService/pregunta.service';
import { LocalStorageService } from 'src/app/core/services/LocalStorage/local-storage.service';
import { QuestionsProfileService } from 'src/app/core/services/api/subjective-profile/questions-profile.service';
import { CuestionarioInitial } from 'src/app/core/models/initial-profile/initial-profile.model';
@Component({
  selector: 'app-stage-two',
  templateUrl: './stage-two.component.html',
  styleUrls: ['./stage-two.component.scss']
})
export class StageTwoComponent {

  // @Input() tematica: string | undefined;// Texto entrada para filtrar las preguntas-respuestas por tematica
  tematicaSeleccionada: string | undefined;
  trivias: any[] = []; // Variable para almacenar trivias filtradas

  buttonText: string = 'Siguiente Pregunta'; // Texto del botón por defecto

  isLastQuestion: boolean = false;
  currentQuestionIndex: number = 0;
  issugerencia:boolean=false;
  preguntas: Pregunta[] = [];
  resPreguntas: Pregunta[] = [];
  data: any;

  descripcionFormateada: string[] = [];

  valorRecibido: any;
  constructor(private questionsService: QuestionsTargetService ,
    private profileService: QuestionsProfileService, 
    private router: Router, private preguntaService: PreguntaService,
    private localStorageService: LocalStorageService) { }

  ngOnInit(): void {

    /*********Area Preguntas onjetivas*********/

    this.loadCuestionario()
    const storedProfile = this.localStorageService.getItem('perfil');
    if (storedProfile) {
      this.valorRecibido = storedProfile;
    }

    this.preguntaService.getPreguntas(this.valorRecibido).subscribe((data: Pregunta[]) => {
      this.resPreguntas = data;
      this.loadQuestions();

    });

  }
/////////////////////
  resCuestionario: CuestionarioInitial = {
    preguntas: [],
  };

  cuestionario: CuestionarioInitial = {
    preguntas: [],
  };

  /////////Almacenamiento de las respuestas de las preguntas
  opcionesSeleccionadas: { seccion: string, pregunta: string, valor: number }[] = [];
  opcionSeleccionada: number = 0;
  respuestasSeleccionadasPorInstrumento: Record<string, number> = {};

  loadCuestionario() {
    this.profileService.getCuestionario().subscribe((data) => {
      console.log("Test Subjetivo Obtenido");
      console.log(data);
      this.resCuestionario = data;
      this.cuestionario.preguntas[0] = this.resCuestionario.preguntas[0];
      // this.loadQuestions();
    });
  }
  
  isArraychek(respuestas: Respuesta[]): respuestas is Respuesta[] {
    return Array.isArray(respuestas);
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
///////////////////////////
  loadQuestions() {
    this.preguntas[0] = this.resPreguntas[0];
    if(this.preguntas[0].tipoContenido=="texto")
    {
      this.formatearDescripcion() ;
    }

    // this.cuestionario.preguntas[0] = this.resCuestionario.preguntas[0];
  }

  isArray(respuestas: string[] | Respuesta[]): respuestas is string[] {
    return Array.isArray(respuestas);
  }

  isArraybnt(respuestas: string[] | RespuestaBnt[]): respuestas is RespuestaBnt[] {
    return Array.isArray(respuestas);
  }

  loadNextQuestion(): void {

    if (this.resPreguntas) {
      // Verifica si todavía hay preguntas disponibles 
      this.currentQuestionIndex++;
      console.log("----------Indice---------");
      console.log(this.currentQuestionIndex);
      console.log("----------his.respQues.preguntass---------");

      if (this.currentQuestionIndex < this.resPreguntas.length) {

        this.preguntas[0] = this.resPreguntas[this.currentQuestionIndex];
        /////////////////////////
        this.cuestionario.preguntas[0] = this.resCuestionario.preguntas[this.currentQuestionIndex];
        ////////////////////////
        if(this.preguntas[0].tipoContenido=="texto")
        {
          this.formatearDescripcion() ;
        }
        // Incrementa el índice para la próxima pregunta

        // this.quest = this.getNextQuestion(trivias, this.currentQuestionIndex);
        // this.options = this.getNextOptions(trivias, this.currentQuestionIndex);
      } else {
        // Si no hay más preguntas, puedes mostrar un mensaje o realizar otra acción
        console.log('Has respondido todas las preguntas.');
        this.isLastQuestion = true;// Habilita Control de pregunta finalizada y habilita boton para volver al home
        this.buttonText = 'Obtener portfolio sugerido';//Podria unificar el loadRoadMap y que sea un control en lugar de cambiar botones
   
      }
    } else {
      console.error('Error: Fin de preguntas válidos- Ultima Vista antes de Volver al home-RoadMap.');
    }
    
  }

  loadSugerencias(): void {
    // this.router.navigate(['/dashboard']);
    this.buttonText = 'Continuar';
    // this.loadRoadMap();
    this.issugerencia = true;
  }

  loadHome(): void {
    this.router.navigate(['/dashboard/precios']);
    this.buttonText = 'Continuar';
    // this.loadRoadMap();
  }

  formatearDescripcion() {
    const lineas = this.preguntas[0].descripcion.split(/(?=[A-Z]- )/);
    this.descripcionFormateada = lineas.map((linea) => linea.trim());
  }

}
