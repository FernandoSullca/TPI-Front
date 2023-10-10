import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionsTargetService } from 'src/app/core/services/api/target-profile/questions-target-profile.service';
import { Pregunta, Respuesta,RespuestaBnt  } from 'src/app/core/models/perfil-objetivo/preguntaObjetivo.model';
import { PreguntaService } from 'src/app/core/services/api/DataLocalService/pregunta.service';
import { LocalStorageService } from 'src/app/core/services/LocalStorage/local-storage.service';
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
    private router: Router, private preguntaService: PreguntaService,
    private localStorageService: LocalStorageService) { }

  ngOnInit(): void {

    /*********Area Preguntas onjetivas*********/

    
    const storedProfile = this.localStorageService.getItem('perfil');
    if (storedProfile) {
      this.valorRecibido = storedProfile;
    }
    this.preguntaService.getPreguntas(this.valorRecibido).subscribe((data: Pregunta[]) => {
      this.resPreguntas = data;
      this.loadQuestions();
    });

  }

  loadQuestions() {
    this.preguntas[0] = this.resPreguntas[0];
    if(this.preguntas[0].tipoContenido=="texto")
    {
      this.formatearDescripcion() ;
    }
    
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
