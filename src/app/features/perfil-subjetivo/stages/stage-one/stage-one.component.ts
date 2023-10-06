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

  cuestionario: Cuestionario= {
    preguntas: [],
  };

  resCuestionario:  Cuestionario= {
    preguntas: [],
  };

   
   buttonText: string = 'Siguiente Pregunta'; // Texto del botón por defecto
 
   isLastQuestion: boolean = false;
   currentQuestionIndex: number = 0;
  //  opcionesSeleccionadas: string[] = [];
   opcionesSeleccionadas: { seccion: string, pregunta: string, valor: number }[] = [];

  
  constructor(private questionsService: QuestionsProfileService,private router: Router) { }

  ngOnInit(): void {
       
      this.questionsService.getPreguntas().subscribe((data) => {
      this.resCuestionario= data;
      this.loadQuestions();
    });

  }
  loadQuestions() {
  
  this.cuestionario.preguntas[0]=this.resCuestionario.preguntas[0];

  }

  loadNextQuestion(): void {

    if (this.resCuestionario) {
      // Incrementa el índice para la próxima pregunta
      this.currentQuestionIndex++;
    
      if (this.currentQuestionIndex <this.resCuestionario.preguntas.length) {
    
        this.cuestionario.preguntas[0]=this.resCuestionario.preguntas[this.currentQuestionIndex];
        console.log(this.cuestionario.preguntas[0]);
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
  isArray(respuestas:Respuesta[]): respuestas is Respuesta[] {
    return Array.isArray(respuestas);
  }
  
  isArraybnt(respuestas: RespuestaBnt[]): respuestas is RespuestaBnt[] {
    return Array.isArray(respuestas);
  }
  
  isArraybntist(respuestas: RespuestaBnt[]): respuestas is RespuestaBnt[] {
    return Array.isArray(respuestas);
  }

  actualizarOpcionesSeleccionadas(seccion: string,pregunta: string, valor: number) {
    if (valor) {

      this.opcionesSeleccionadas.push({ seccion, pregunta, valor });
    } else {
      // Eliminar la opción no seleccionada del arreglo de opciones seleccionadas
      const index = this.opcionesSeleccionadas.findIndex(opcion => opcion.pregunta === pregunta && opcion.valor === valor);
      if (index !== -1) {
        this.opcionesSeleccionadas.splice(index, 1);
      }
    }
  }
  loadHome(): void {
    this.router.navigate(['/dashboard/perfil-inversor']);
    this.buttonText = 'Continuar';
    // this.loadRoadMap();
  }

}
 

