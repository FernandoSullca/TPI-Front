import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionsTargetService } from 'src/app/core/services/api/target-profile/questions-target-profile.service';
import { PreguntaApi, RespuestaAPI } from 'src/app/core/models/API/Pregunta-APi.model';
import { PreguntaObjetivasService } from 'src/app/core/services/dataLocalServices/Preguntas-Objetivas/preguntaObjetiva.service';
// import { QuestionsTargetService} from 'src/app/core/services/api/target-profile/questions-target-profile.service';

import { LocalStorageService } from 'src/app/core/services/LocalStorage/local-storage.service';
import { from } from 'rxjs';
@Component({
  selector: 'app-stage-two',
  templateUrl: './stage-two.component.html',
  styleUrls: ['./stage-two.component.scss']
})
export class StageTwoComponent {

  // @Input() tematica: string | undefined;// Texto entrada para filtrar las preguntas-respuestas por tematica

  buttonText: string = 'Siguiente Pregunta'; // Texto del botón por defecto

  isLastQuestion: boolean = false;
  currentQuestionIndex: number = 0;
  issugerencia: boolean = false;
  preguntas: PreguntaApi[] = [];
  resPreguntas: PreguntaApi[] = [];

  descripcionFormateada: string[] = [];
  //////////Control y suma de respuestas; 
  /////////Almacenamiento de las respuestas Calculada
  respuestasPerfil: any = [];

  opcionSeleccionada: number = 0;
  AnalisisObjetivo: Record<string, number> = {};
  ResultadoPerfilObjetivo: string = "";
  valorRecibido: string="";
  
  dataPrefil={
    conservador:"Se caracteriza por buscar inversiones que representen un crecimiento moderado, sin asumir riesgos importantes, priorizando tener una disponibilidad inmediata de sus inversiones y buscando minimizar la incidencia de las fluctuaciones del mercado.",
    moderado:"Se encuentra dispuesto a asumir ciertas oscilaciones en sus inversiones, esperando que en un mediano largo plazo pueda obtener una mayor rentabilidad. Es un perfil intermedio, tratándose de personas que pueden tolerar cierto riesgo en sus inversiones a cambio de una mayor rentabilidad.",
    Arriesgado:"Se caracteriza por inversores cuyo objetivo principal es maximizar el rendimiento de su cartera, asumiendo para ello un alto componente de riesgo. Están dispuestos a mantener sus inversiones por períodos largos, sin asignarle una alta prioridad a la disponibilidad inmediata de sus activos.",
  }
  constructor(private preguntaObjetivasServiceAPI_: QuestionsTargetService,
    private router: Router, private preguntaObjetivasServiceLocal_: PreguntaObjetivasService,
    private localStorageService: LocalStorageService) {

  }

  ngOnInit(): void {

    /*********Area Preguntas onjetivas*********/
    const storedProfile = this.localStorageService.getItem('perfil');
    this.AnalisisObjetivo["toleranciaRiesgo"] = this.localStorageService.getItem('toleranciaRiesgo');
    this.AnalisisObjetivo["horizonteTemporal"] = this.localStorageService.getItem('horizonteTemporal');
    if (storedProfile) {
      this.valorRecibido = storedProfile;
    }

    this.preguntaObjetivasServiceAPI_.obtenerTestObjetivo(this.valorRecibido)
      .then((testSubjetivo) => {
        this.resPreguntas = testSubjetivo;
        if (this.resPreguntas) {
          this.preguntaObjetivasServiceLocal_.getPreguntas(this.valorRecibido).
          subscribe((data: PreguntaApi[]) => {
            this.resPreguntas = data;
            this.loadQuestions();
          });
        }
        else {
          this.loadQuestions();
        }
      })
      .catch(
        (error) => {
          console.error("Error al obtener datos del API:", error),
            this.preguntaObjetivasServiceLocal_.getPreguntas(this.valorRecibido).
            subscribe((data: PreguntaApi[]) => {
              this.resPreguntas = data;
              this.loadQuestions();
            });
        }
      )
      .finally(() => {
      }
      );

  }

  loadQuestions() {
    this.preguntas[0] = this.resPreguntas[0];
  }


  loadNextQuestion(): void {

    if (this.resPreguntas) {
      // Verifica si todavía hay preguntas disponibles 
      this.currentQuestionIndex++;

      this.guardarRespuestas();
      if (this.currentQuestionIndex < this.resPreguntas.length) {

        this.preguntas[0] = this.resPreguntas[this.currentQuestionIndex];

      } else {
        // Si no hay más preguntas, puedes mostrar un mensaje o realizar otra acción
        //Anteds de mostrar la sig pan

        this.entregarResultados().then((data) => {
          this.respuestasPerfil = data;
          this.localStorageService.setItem('perfil', this.respuestasPerfil.perfilInversor);
          this.ResultadoPerfilObjetivo = this.respuestasPerfil.perfilInversor;
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

  public async entregarResultados(): Promise<any> {
    if (!this.validateData()) {
      return;
    }

    try {
      console.log("Enviando Resultados...");
      const data = await from(this.preguntaObjetivasServiceAPI_.TestObjetivoResultados(this.AnalisisObjetivo)).toPromise();

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

  validateData() {
    return true;
  }

  guardarRespuestas() {

    if (!this.AnalisisObjetivo["Conocimento"]) {
      this.AnalisisObjetivo["Conocimento"] = 0;
    }
    this.AnalisisObjetivo["Conocimento"] += this.opcionSeleccionada;
    console.log(this.AnalisisObjetivo);
  }

  loadSugerencias(): void {
    this.buttonText = 'Continuar';
    this.issugerencia = true;
  }

  isArray(respuestas: string[] | RespuestaAPI[]): respuestas is string[] {
    return Array.isArray(respuestas);
  }

  formatearDescripcion() {
    const lineas = this.preguntas[0].descripcion.split(/(?=[A-Z]- )/);
    this.descripcionFormateada = lineas.map((linea) => linea.trim());
  }

  actualizarOpcionesSeleccionadas(pregunta: string, valor: number) {
    //Se pasa por alto la validacion///////////////////////////////////////////////
    console.log(valor);
    this.opcionSeleccionada = valor;
  }

  loadHome(): void {
    this.router.navigate(['/dashboard/precios']);
    this.buttonText = 'Continuar';
  }

}
