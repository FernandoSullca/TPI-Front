import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cuestionario, Respuesta,RespuestaBnt  } from 'src/app/core/models/profile-inicial/questions-profile.model';
import { QuestionsProfileService } from 'src/app/core/services/api/DataLocalService/questions-profile.service';
@Component({
  selector: 'app-stage-one',
  templateUrl: './stage-one.component.html',
  styleUrls: ['./stage-one.component.scss']
})
export class StageOneComponent implements OnInit{
  respQues: Cuestionario= {
    preguntas: [],
  };
  cuestionario: Cuestionario= {
    preguntas: [],
  };

  // @Input() tematica: string | undefined;// Texto entrada para filtrar las preguntas-respuestas por tematica
  tematicaSeleccionada: string | undefined;
   trivias: any[] = []; // Variable para almacenar trivias filtradas
  
   buttonText: string = 'Siguiente Pregunta'; // Texto del botón por defecto
 
   isLastQuestion: boolean = false;
   currentQuestionIndex: number = 0;

  
  constructor(private questionsService: QuestionsProfileService,private router: Router) { }

  ngOnInit(): void {
   
       // Llamas al método del servicio para obtener el cuestionario
    // Si estás utilizando el método que devuelve el JSON local, puedes hacerlo así:
    // this.cuestionario = this.questionsService.getCuestionarioInicial();

    // Si estás utilizando el método que realiza una solicitud HTTP, puedes hacerlo así:
    // this.questionsService.getCuestionario().subscribe((data) => {
    //   this.cuestionario = data;
    // });

    // Ejemplo usando el método con el JSON local (descomenta esta línea y comenta la línea siguiente si es tu caso):
    this.respQues= this.questionsService.getCuestionarioInicial();
    this.loadQuestions();
    
  }
  loadQuestions() {
  console.log( "--------Load Questions----");
  this.cuestionario.preguntas[0]=this.respQues.preguntas[0];
  console.log("----------");
  console.log(this.cuestionario.preguntas[0]);
  console.log(this.respQues.preguntas[0]);
  console.log("----Todas las preguntas-");
  console.log(this.respQues.preguntas);
  console.log("----------");
  }

  isArray(respuestas: string[] | Respuesta[]): respuestas is string[] {
    return Array.isArray(respuestas);
  }
  
  isArraybnt(respuestas: string[] | RespuestaBnt[]): respuestas is RespuestaBnt[] {
    return Array.isArray(respuestas);
  }
  
  loadNextQuestion(): void {

    if (this.respQues) {
 
      const resp = this.respQues.preguntas;
      console.log( "--------Load NEXtQuestions----");
      console.log( this.respQues);
      console.log( "-------------------");
      console.log( resp);
      console.log( this.respQues.preguntas);
      console.log( "---------LOngitudd----------");
      console.log( resp.length);
      // Verifica si todavía hay preguntas disponibles 
      this.currentQuestionIndex++;
      console.log( "----------Indice---------");
      console.log(this.currentQuestionIndex);
      console.log( "----------his.respQues.preguntass---------");
      console.log(this.respQues.preguntas[0]);
      console.log(this.respQues.preguntas[1]);
      console.log(this.respQues.preguntas[2]);
    
      if (this.currentQuestionIndex <resp.length) {
        this.cuestionario.preguntas[0]=this.respQues.preguntas[this.currentQuestionIndex];
        // Incrementa el índice para la próxima pregunta

        // this.quest = this.getNextQuestion(trivias, this.currentQuestionIndex);
        // this.options = this.getNextOptions(trivias, this.currentQuestionIndex);
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

  loadHome(): void {
    this.router.navigate(['/dashboard']);
    this.buttonText = 'Continuar';
    // this.loadRoadMap();
  }

}
 

