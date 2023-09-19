import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src\\app\\core\\services\\api\\questions\\question.service' // Reemplaza con la ubicación real de tu servicio
import { Tematica, Opcion, Pregunta, Introduccion, Trivia, Questions } from 'src/app/core/models/questions/questions.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acciones',
  templateUrl: './acciones.component.html',
  styleUrls: ['./acciones.component.scss']
})

export class AccionesComponent implements OnInit {

  buttonText: string = 'Siguiente Pregunta'; // Texto del botón por defecto
  isLastQuestion: boolean = false;
  respQuestions:  any;
  
  currentQuestion: string='';
  trivias: Trivia[]=[];
  options: Opcion[]=[];
   quest:Pregunta= {
        pregunta: '',
        opciones: []
   };
 
  currentQuestionIndex: number=0;
  constructor(private questionService: QuestionService,private router: Router) { }

  ngOnInit(): void {
    // Carga las preguntas desde el archivo JSON cuando se inicie el componente
  
  }

  getTriviaQuestions(){

    console.log(this.respQuestions);
    console.log(this.respQuestions.Trivias);
    this.trivias=this.respQuestions.Trivias;
  }

  getQuestion(tr: Trivia[]): Pregunta  {

    if (tr && tr.length > 0 && tr[0].preguntas && tr[0].preguntas.length > 0) {
      return tr[0].preguntas[0];
    } else {
      return {
        pregunta: '',  
        opciones: []   
      };
    }

  }

  getOptions(tr: Trivia[]): Opcion[] {

    if (tr && tr.length > 0 && tr[0].preguntas) {
      return tr[0].preguntas[0].opciones || [];
    } else {
      return [];
    }
  }


  loadNextArea(option: string): void {
 
  }

  loadRoadMap(): void {
    this.router.navigate(['/home']); 
    this.buttonText = 'Continuar'; 
    // this.loadRoadMap();
  }
  onOptionSelected(option: string): void {
    // Lógica para manejar la selección de una opción (verificar si es correcta, etc.)
    // Puedes implementar esto según tus necesidades.
    // Aquí puedes llamar a loadNextQuestion() para cargar la siguiente pregunta.
  }

}
