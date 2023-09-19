import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Tematica, Opcion, Pregunta, Introduccion, Trivia, Questions } from 'src/app/core/models/questions/questions.models';
import { DataServiceService } from 'src/app/core/services/api/DataLocalService/data-service.service';


@Component({
  selector: 'app-opciones',
  templateUrl: './opciones.component.html',
  styleUrls: ['./opciones.component.scss']
})
export class OpcionesComponent {
  trivias: any[] = []; // Variable para almacenar trivias filtradas
  options: Opcion[] = [];
  quest: Pregunta = {
    pregunta: '',
    opciones: []
  };
  buttonText: string = 'Siguiente Pregunta'; // Texto del botón por defecto
  tematicaSeleccionada: string = 'Opciones'; // Temática seleccionada
  isLastQuestion: boolean = false;
  currentQuestionIndex: number = 0;
  constructor(private DataService: DataServiceService, private router: Router) { }


ngOnInit(): void {
  // Llama al servicio para obtener trivias por la temática seleccionada
  this.loadQuestion();
}



loadQuestion(): void {
  this.trivias = this.DataService.getTriviasByTematica(this.tematicaSeleccionada);
  this.quest = this.getQuestion(this.trivias);
  this.options = this.getOptions(this.trivias);
  // console.log(this.trivias)
  // console.log(this.quest)
  // console.log(this.options)
}

loadNextQuestion(): void {
  
   if (this.trivias)
  {  
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
    console.log( trivias.length);
    // Incrementa el índice para la próxima pregunta
  
    this.quest = this.getNextQuestion(trivias,this.currentQuestionIndex);
    this.options = this.getNextOptions(trivias,this.currentQuestionIndex);
  } else {
    // Si no hay más preguntas, puedes mostrar un mensaje o realizar otra acción
    console.log('Has respondido todas las preguntas.');
    this.isLastQuestion = true;
    this.buttonText = 'Continuar';
  }
} else {
console.error('Error: HardcodePreguntas no contiene datos válidos.');
}
}


// if (this.isLastQuestion) {
//   // Si no hay más preguntas, redirige a la página deseada
//   console.log('Has respondido todas las preguntas.');
//   this.router.navigate(['/otra-pagina']); // Reemplaza '/otra-pagina' con la URL de la página a la que deseas redirigir.
// } else {
//   // Carga la siguiente pregunta o Debo verificar si existe otras mecanicas de preguntas
//   this.loadNextQuestion();
// }

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
getNextQuestion(tr: Pregunta[],indice:number): Pregunta  {
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
getNextOptions(tr: Pregunta[],indice:number): Opcion[] {
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
