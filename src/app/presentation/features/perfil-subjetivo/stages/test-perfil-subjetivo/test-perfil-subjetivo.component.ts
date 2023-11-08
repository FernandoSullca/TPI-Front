import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { PreguntaApi, RespuestaAPI } from 'src/app/core/models/API/Pregunta-APi.model';
import { QuestionsProfileService } from 'src/app/core/services/api/subjective-profile/questions-profile.service';
import { PreguntaSubjetivasService } from 'src/app/core/services/dataLocalServices/Preguntas-Subjetivas/preguntaSubjetiva.service';
import { PerfilInversorAPI } from 'src/app/core/models/API/Perfil-Inversor-API.model';
import { LocalStorageService } from 'src/app/core/services/LocalStorage/local-storage.service';
@Component({
  selector: 'app-test-perfil-subjetivo',
  templateUrl: './test-perfil-subjetivo.component.html',
  styleUrls: ['./test-perfil-subjetivo.component.scss']
})
export class TestPerfilSubjetivoComponent implements OnInit {

  loading: boolean = false;
  resCuestionarioAPI: PreguntaApi[] = [];
  cuestionario: PreguntaApi = {
    enunciado: "",
    descripcion: "",
    categoria: {
      nombre: "",
      descripcion: "",
    },
    seccion: {
      nombre: "",
      descripcion: "",
    },
    orden: 0,
    tipoComponente: "",
    respuestas: []
  };
  perfilInversorUsuario: PerfilInversorAPI = {
    oid: 0,
    deleted: 0,
    version: 0,
    horizonteTemporal: 0,
    toleranciaRiesgo: 0,
    tipoPerfilSubjetivo: "",
    nivelConocimiento: 0,
    tipoNivelConocimiento: "",
    perfilInversor: "",
    resultadoPerfilado: "",
    UsuarioDTO:{
      oid: 0,
      version: 0,
      pass: "",
      username: "",
      nombreUsuario: "",
      nombre: "",
      apellido: "",
      email: "",
      cuentaConfirmada: false,
      activo: false,
    },

  }

  buttonText: string = 'CONTINUAR';
  isLastQuestion: boolean = false;
  currentQuestionIndex: number = 0;
  respPerfilResultante: string = "";
  opcionesSeleccionadas: { seccion: string, pregunta: string, valor: number }[] = [];
  opcionSeleccionada: number = 0;
  respuestasSeleccionadasPorInstrumento: Record<string, number> = {};

  AnalisisSubjetivo: Record<string, number> = {};

  respuestasPerfil: {
    toleranciaRiesgo: number;
    horizonteTemporal: number;
    perfilInversor: string;
    tipoPerfilSubjetivo: string;
  } = {
      toleranciaRiesgo: 0,
      horizonteTemporal: 0,
      perfilInversor: "",
      tipoPerfilSubjetivo: "",
    };


  constructor(private profileServiceAPI_: QuestionsProfileService,
    private preguntaSubjetivasServiceLocal_: PreguntaSubjetivasService,
    private router: Router,
    private localStorageService: LocalStorageService,
  ) {

  }

  ngOnInit(): void {
    this.loading = true;
    this.profileServiceAPI_.obtenerTestSubjetivo()
      .then((testSubjetivo) => {
        this.resCuestionarioAPI = testSubjetivo;
        //Si vino Vacio y quiero buscar en mi local
        if (this.resCuestionarioAPI == null || this.resCuestionarioAPI.length == 0) {
          this.loadQuestionsFromLocal()
        }
        else {
          this.loadQuestions();
        }
      })
      .catch(
        (error) => {
          console.error("Error al obtener datos del API:", error);
          this.loadQuestionsFromLocal();
        })
        .finally(() => {
          this.loading = false;
          this.perfilInversorUsuario = this.localStorageService.GetPerfilActualLocal();
          this.perfilInversorUsuario.UsuarioDTO = this.localStorageService.GetUsuarioPerfilActualLocal();   
         })
  }

  public loadQuestionsFromLocal() {
    return this.preguntaSubjetivasServiceLocal_.getCuestionario()
      .subscribe(
        (testSubjetivo) => {
          this.resCuestionarioAPI = testSubjetivo;
          this.loadQuestions();
        },
        (error) => console.error(error))
  }

  loadQuestions() {

    this.cuestionario = this.resCuestionarioAPI[0];

  }

  loadNextQuestion(): void {

    if (this.resCuestionarioAPI) {
      this.guardarrespuestas(this.cuestionario?.seccion?.nombre, this.cuestionario?.tipoComponente);
      this.currentQuestionIndex++;

      if (this.currentQuestionIndex + 1 == this.resCuestionarioAPI.length) {

        this.buttonText = 'Completar Test'
      }

      if (this.currentQuestionIndex < this.resCuestionarioAPI.length) {

        this.cuestionario = this.resCuestionarioAPI[this.currentQuestionIndex];
      }

      else {

        this.FinalizarTestSubjetivo();

      }
    }
    else {
      console.error('Error: Fin de preguntas válidos');
    }
  }

  guardarrespuestas(seccion: string, tipo: string) {
    let Sumatoria=0;
    switch (tipo) {
      case 'CHECKBOX':
        const valoresCheckbox = this.opcionesSeleccionadas.map(respuesta => respuesta.valor);
        const sumaCheckbox = valoresCheckbox.reduce((total, valor) => total + valor, 0);
        Sumatoria=sumaCheckbox;

        break;
      case 'RADIO':
        let valorRadio = this.opcionSeleccionada;
        Sumatoria=valorRadio

        break;
      case 'BOTON':
        let suma = 0;
        for (const instrumento in this.respuestasSeleccionadasPorInstrumento) {
          // if (this.respuestasSeleccionadasPorInstrumento.hasOwnProperty(instrumento)) {
            suma += this.respuestasSeleccionadasPorInstrumento[instrumento];
            this.respuestasSeleccionadasPorInstrumento[instrumento] = 0;
          // }
        }
        Sumatoria=suma
        break;
      default:
        // Tipo de pregunta no reconocido
        console.error('Tipo de pregunta no reconocido-para valorizar respuesta');
        break;
    }

    if (!this.AnalisisSubjetivo[seccion]) {
      this.AnalisisSubjetivo[seccion] = 0;
    }
    this.AnalisisSubjetivo[seccion] += Sumatoria;
    this.opcionesSeleccionadas = [];
    this.opcionSeleccionada = 0;
  }

  public FinalizarTestSubjetivo() {
    this.isLastQuestion = true;
    this.buttonText = 'FINALIZAR';

    /////Si es correcto Almaceno el perfil en el Perfil en Local
    this.entregarResultados().then((data) => {
      this.respuestasPerfil = data;
      // console.log("🚀 ~ file: test-perfil-subjetivo.component.ts:213 ~ TestPerfilSubjetivoComponent ~ this.entregarResultados ~ data:", data)
      this.respPerfilResultante = data.perfilInversor;
      //VAriables locales Perfil y Usuario...
      this.localStorageService.setItem('perfilinversor', this.respuestasPerfil.perfilInversor);
      this.localStorageService.setItem('perfilsubjetivo', this.respuestasPerfil.tipoPerfilSubjetivo);
      this.localStorageService.setItem('Username', this.perfilInversorUsuario.UsuarioDTO.nombreUsuario);
     
      this.perfilInversorUsuario.perfilInversor = this.respuestasPerfil.perfilInversor;
      this.perfilInversorUsuario.tipoPerfilSubjetivo = this.respuestasPerfil.tipoPerfilSubjetivo;
      this.perfilInversorUsuario.oid = data.oid;
      this.localStorageService.setPerfilSubjetivo(this.perfilInversorUsuario);
      this.localStorageService.SetPerfilActualLocal();
      this.loadPageResultado();
    });
  }

  public async entregarResultados(): Promise<any> {

    if (!this.validateData()) {
      return {
        toleranciaRiesgo: this.AnalisisSubjetivo["Tolerancia al riesgo"],
        horizonteTemporal: this.AnalisisSubjetivo["Horizonte Temporal"],
        perfilInversor: ""
      };
    }

    try {

      this.perfilInversorUsuario.horizonteTemporal = this.AnalisisSubjetivo["Horizonte Temporal"];
      this.perfilInversorUsuario.toleranciaRiesgo = this.AnalisisSubjetivo["Tolerancia al riesgo"];
      
      const data = await from(this.profileServiceAPI_.TestSubjetivoResultadosObtenidos(this.perfilInversorUsuario)).toPromise();
      if (data && data.perfilInversor) {
        return data;
      } else {
        console.error('No se recibió una respuesta válida de la API.');
        return {
          toleranciaRiesgo: this.AnalisisSubjetivo["Tolerancia al riesgo"],
          horizonteTemporal: this.AnalisisSubjetivo["Horizonte Temporal"],
          perfilInversor: ""
        };
      }
    } catch (error) {
      console.error('Error al enviar los resultados:', error);
      return {
        toleranciaRiesgo: this.AnalisisSubjetivo["Tolerancia al riesgo"],
        horizonteTemporal: this.AnalisisSubjetivo["Horizonte Temporal"],
        perfilInversor: ""
      };
    }
  }

  validateData(): boolean {

    return Object.keys(this.AnalisisSubjetivo).length > 0;
  }

  loadPageResultado(): void {
    this.router.navigate(['/perfil-inversor-resultado']);
    this.buttonText = 'Continuar al Panel de usuario';
  }

  /***************************************************************/

  //Helpers Html
  //Obtiene el refactor de preguntas de botones para que sea visibles
  opcionesPorInstrumento(respuestasbnts: RespuestaAPI[], instrumento: string): any[] {

    return respuestasbnts
      .filter((respuestasbnts) => respuestasbnts.instrumento === instrumento)
      .sort((a: { orden: number; }, b: { orden: number; }) => a.orden - b.orden);
  }

  esRespuestaSeleccionada(instrumento: string, valor: number, order: number): boolean {
    return this.respuestasSeleccionadasPorInstrumento[instrumento] === valor;
  }

  //CheckBox, opciones multiples...
  actualizarOpcionesSeleccionadas(seccion: string, pregunta: string, valor: number) {

    const index = this.opcionesSeleccionadas.findIndex(opcion => opcion.pregunta === pregunta && opcion.valor === valor);
    if (index !== -1) {
      // Eliminar la opción no seleccionada del arreglo de opciones seleccionadas
      this.opcionesSeleccionadas.splice(index, 1);

    } else {
      // Si noesta en el grupo de opciones ingresadas se guarda
      this.opcionesSeleccionadas.push({ seccion, pregunta, valor });
    }
  }

  //instrumewntos multiples, opciones multiples...
  actualizarOpcionesSeleccionadasBotonInstrumento(seccion: string, instrumento: string, valor: number) {

    this.respuestasSeleccionadasPorInstrumento[instrumento] = valor;
  }

  esPrimero(respuestasbnts: RespuestaAPI) {
    return respuestasbnts.orden == 1;
  }

  isArray(respuestas: RespuestaAPI[]): respuestas is RespuestaAPI[] {
    return Array.isArray(respuestas);
  }
}




