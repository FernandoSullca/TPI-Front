import { Component,Input } from '@angular/core';

import { Router } from '@angular/router';
import { Tematica, Opcion, Pregunta, Introduccion, Trivia, Questions } from 'src/app/core/models/questions/questions.models';
import { DataServiceService } from 'src/app/core/services/api/DataLocalService/data-service.service';


@Component({
  selector: 'app-trivia',
  templateUrl: './trivia.component.html',
  styleUrls: ['./trivia.component.scss']
}) 

export class TriviaComponent {
 @Input() tematica: string | undefined;// Texto entrada para filtrar las preguntas-respuestas por tematica
 tematicaSeleccionada: string | undefined;
  trivias: any[] = []; // Variable para almacenar trivias filtradas
  options: Opcion[] = [];
  quest: Pregunta = {
    pregunta: '',
    opciones: []
  };
  buttonText: string = 'Siguiente Pregunta'; // Texto del botón por defecto

  isLastQuestion: boolean = false;
  currentQuestionIndex: number = 0;

  constructor(private DataService: DataServiceService, private router: Router) { }

  ngOnInit(): void {
    this.tematicaSeleccionada = this.tematica;
    this.loadQuestion();
  }

  loadQuestion(): void {
    console.log(this.tematicaSeleccionada)
    console.log(this.tematica)
    if (this.tematicaSeleccionada !== undefined) {
    this.trivias = this.DataService.getTriviasByTematica(this.tematicaSeleccionada);
    this.quest = this.getQuestion(this.trivias);
    this.options = this.getOptions(this.trivias);
      console.log(this.trivias)
     console.log(this.quest)
     console.log(this.options)
    }
  }

  loadNextQuestion(): void {

    if (this.trivias) {
      // console.log('Tematica general.');
      // console.log(this.trivias)
      // Obtén las trivias de HardcodePreguntas
      const trivias = this.trivias[0].preguntas;
      //  console.log('Opteniendo las trivias del tematica.');
      //  console.log(trivias)
      // Verifica si todavía hay preguntas disponibles 
      this.currentQuestionIndex++;
      if (this.currentQuestionIndex < trivias.length) {
        console.log(this.currentQuestionIndex);
        console.log(trivias.length);
        // Incrementa el índice para la próxima pregunta

        this.quest = this.getNextQuestion(trivias, this.currentQuestionIndex);
        this.options = this.getNextOptions(trivias, this.currentQuestionIndex);
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


  getQuestion(tr: Trivia[]): Pregunta {

    if (tr && tr.length > 0 && tr[0].preguntas && tr[0].preguntas.length > 0) {
      return tr[0].preguntas[0];
    } else {
      return {
        pregunta: '',
        opciones: []
      };
    }

  }
  getNextQuestion(tr: Pregunta[], indice: number): Pregunta {
    console.log('Opteniendo las trivias del tematica.getNextQuestio');
    if (tr && tr.length > 0 && tr[indice]) {
      console.log(tr[indice]);
      return tr[indice];
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
  getNextOptions(tr: Pregunta[], indice: number): Opcion[] {
    console.log('Opteniendo las Opciones trivias del tematica.getNextOptions');

    if (tr && tr.length > 0 && tr[indice].opciones) {
      console.log(tr[indice].opciones);
      return tr[indice].opciones || [];
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
