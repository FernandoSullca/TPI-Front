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
  seleccionada:boolean=false
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
   opcionesSeleccionadas: { seccion: string, pregunta: string, valor: number } [] = [];
   opcionSeleccionada: number = 0;
   //fix radius, una unica opcion
  //  opcionSeleccionada: { seccion: string, pregunta: string, valor: number } | null = null;

   respuestasDeUsuario:{seccion: string,calculo: number } [] = [];

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
      // Guaradr respuesta de usuario
      this.guardarrespuestas(this.cuestionario.preguntas[0].seccion.nombre,
                             this.cuestionario.preguntas[0].TipoComponente);

      console.log("-Resultado Guradado");    
      console.log(this.respuestasDeUsuario);                
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

  actualizarOpcionesSeleccionadas(seccion: string,pregunta: string, valor: number, seleccionada: boolean) {
  
    // console.log(this.opcionesSeleccionadas);
    console.log(this.opcionSeleccionada);
    if (seleccionada) {
      this.opcionesSeleccionadas.push({ seccion, pregunta, valor });
    } else {
      // Eliminar la opción no seleccionada del arreglo de opciones seleccionadas
      const index = this.opcionesSeleccionadas.findIndex(opcion => opcion.pregunta === pregunta && opcion.valor === valor);
      if (index !== -1) {
        this.opcionesSeleccionadas.splice(index, 1);
      }
    }
    // console.log(this.opcionesSeleccionadas);
  }

  loadHome(): void {
    this.router.navigate(['/dashboard/perfil-inversor']);
    this.buttonText = 'Continuar';
    // this.loadRoadMap();
  }

  guardarrespuestas(seccion: string, tipo: string) {
    // Verificar el tipo de pregunta
    let index=-1
    switch (tipo) {
      case 'checkbox':
        // Pregunta de tipo checkbox
        // const respuestaExistente = this.respuestasDeUsuario.find(respuesta => respuesta.seccion === seccion);
        index = this.respuestasDeUsuario.findIndex(respuesta => respuesta.seccion === seccion);
        const valoresCheckbox = this.opcionesSeleccionadas.map(respuesta => respuesta.valor);
        const sumaCheckbox = valoresCheckbox.reduce((total, valor) => total + valor, 0);
        if( index !== -1){
            // respuestaExistente.calculo += sumaCheckbox;
          this.respuestasDeUsuario[index].calculo += sumaCheckbox;
        }
        else
        {
          this.respuestasDeUsuario.push({ seccion, calculo: sumaCheckbox });
        }
        
        break;
      case 'radio':
        // Pregunta de tipo radio
        index = this.respuestasDeUsuario.findIndex(respuesta => respuesta.seccion === seccion);
        const valorRadio = this.opcionSeleccionada; 
        if( index !== -1){
        this.respuestasDeUsuario[index].calculo += valorRadio;
        }
        else{
          
        this.respuestasDeUsuario.push({ seccion, calculo: valorRadio });
        }
       
        break;
      case 'boton':
        // Pregunta de tipo botón
        // Realiza aquí las acciones específicas para preguntas de botón
        break;
      default:
        // Tipo de pregunta no reconocido
        console.error('Tipo de pregunta no reconocido');
        break;
    }
  }
  
}
 



