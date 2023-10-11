import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionsTargetService } from 'src/app/core/services/api/target-profile/questions-target-profile.service';
import { Pregunta, Respuesta,RespuestaBnt  } from 'src/app/core/models/perfil-objetivo/preguntaObjetivo.model';
import { PreguntaService } from 'src/app/core/services/api/DataLocalService/pregunta.service';
import { LocalStorageService } from 'src/app/core/services/LocalStorage/local-storage.service';
import { QuestionsProfileService } from 'src/app/core/services/api/subjective-profile/questions-profile.service';
import { from } from 'rxjs';
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
//////////Control uy suma de respuestas; 
/////////Almacenamiento de las respuestas Calculada
respuestasPerfil: any = [];

opcionSeleccionada: number = 0;
AnalisisObjetivo: Record<string, number> = {};
ResultadoPerfilObjetivo:string="";
  valorRecibido: any;
  constructor(private questionsService: QuestionsTargetService , 
    private router: Router, private preguntaService: PreguntaService,
    private localStorageService: LocalStorageService,
    private profileService: QuestionsProfileService) { 

    }


  ngOnInit(): void {

    /*********Area Preguntas onjetivas*********/

    
    const storedProfile = this.localStorageService.getItem('perfil');
    this.AnalisisObjetivo["toleranciaRiesgo"]=this.localStorageService.getItem('toleranciaRiesgo');
    this.AnalisisObjetivo["horizonteTemporal"]=this.localStorageService.getItem('horizonteTemporal');
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
      this.guardarRespuestas();
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
        //Anteds de mostrar la sig pan
 
        this.entregarResultados().then((data) => {
          this.respuestasPerfil = data;
          this.profileService.disparadordemensageResultado.emit({
            data:this.respuestasPerfil.perfilInversor
          });
          this.localStorageService.setItem('perfil',this.respuestasPerfil.perfilInversor);
          this.ResultadoPerfilObjetivo=this.respuestasPerfil.perfilInversor;
          console.log('Entrega de resultados completada.');
        });
        ////////////////////////
        console.log('Has respondido todas las preguntas.');
        this.isLastQuestion = true;// Habilita Control de pregunta finalizada y habilita boton para volver al home
        this.buttonText = 'Obtener portfolio sugerido';//Podria unificar el loadRoadMap y que sea un control en lugar de cambiar botones
   
      }
    } else {
      console.error('Error: Fin de preguntas válidos- Ultima Vista antes de Volver al home-RoadMap.');
    }
  }

  public async entregarResultados(): Promise<void> {
    if (!this.validateData()) {
      return;
    }

    try {
      console.log("Enviando Resultados...");
      const data = await from(this.profileService.TestObjetivoResultados(this.AnalisisObjetivo)).toPromise();

      if (data && data.perfilInversor) {
        this.respuestasPerfil = data;
        console.log("Resultados enviados correctamente");
        return this.respuestasPerfil;
      } else {
        console.error('No se recibió una respuesta válida de la API.');
        // Maneja el error como sea necesario
      }
    } catch (error) {
      console.error('Error al enviar los resultados:', error);
      // Maneja el error como sea necesario
    }
  }

////////////Validar
  validateData() {
    return true;
  }

  
  guardarRespuestas() {
  
       // console.log('Suma total:Area RADIO');
      //  const valoresCheckbox = this.opcionesSeleccionadas.map(respuesta => respuesta.valor);
      //   const sumaCheckbox = valoresCheckbox.reduce((total, valor) => total + valor, 0);
      if (!  this.AnalisisObjetivo["Conocimento"]) {
        this.AnalisisObjetivo["Conocimento"] = 0;
      }
      console.log(this.AnalisisObjetivo);
      this.AnalisisObjetivo["Conocimento"]+=this.opcionSeleccionada;
      console.log(this.AnalisisObjetivo);
      // console.log(valorRadio);
  
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

  actualizarOpcionesSeleccionadas(pregunta: string, valor: number) {
    //Se pasa por alyto la validacion///////////////////////////////////////////////
    // SE actualiza para el cadso de los raidus(unica opcion)
    console.log(valor);
    this.opcionSeleccionada = valor;

  }

}
