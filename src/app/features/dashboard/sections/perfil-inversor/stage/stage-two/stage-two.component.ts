import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cuestionario, Respuesta, RespuestaBnt } from 'src/app/core/models/profile-inicial/questions-profile.model';
import { QuestionsProfileService } from 'src/app/core/services/api/DataLocalService/questions-profile.service';
import { Pregunta } from 'src/app/core/models/perfil-objetivo/preguntaObjetivo.model';
import { PreguntaService } from 'src/app/core/services/api/DataLocalService/pregunta.service';
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

  constructor(private questionsService: QuestionsProfileService, private router: Router, private preguntaService: PreguntaService) { }

  ngOnInit(): void {

    /*********Area Preguntas onjetivas*********/
    this.preguntaService.getPreguntas().subscribe((data: Pregunta[]) => {
      this.resPreguntas = data;
      this.loadQuestions();
    });

  }

  loadQuestions() {
    this.preguntas[0] = this.resPreguntas[0];
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


}
