import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionsTargetService } from 'src/app/core/services/api/target-profile/questions-target-profile.service';
import { PreguntaApi, RespuestaAPI } from 'src/app/core/models/API/Pregunta-APi.model';
import { PreguntaObjetivasService } from 'src/app/core/services/dataLocalServices/Preguntas-Objetivas/preguntaObjetiva.service';
import { LocalStorageService } from 'src/app/core/services/LocalStorage/local-storage.service';
import { from } from 'rxjs';
import { SafeUrl } from '@angular/platform-browser';
import { CarteraService } from 'src/app/core/services/api/cartera/cartera.service';
import { PerfilInversorAPI } from 'src/app/core/models/API/Perfil-Inversor-API.model';
@Component({
  selector: 'app-test-perfil-inversor-objetivo',
  templateUrl: './test-perfil-inversor-objetivo.component.html',
  styleUrls: ['./test-perfil-inversor-objetivo.component.scss']
})
export class TestPerfilInversorObjetivoComponent implements OnInit {

  Username: string = "";

  buttonText: string = 'Continuar'; // Texto del botón por defecto

  isLastQuestion: boolean = false;
  currentQuestionIndex: number = 0;
  issugerencia: boolean = false;
  preguntas: PreguntaApi[] = [];
  resPreguntas: PreguntaApi[] = [];

  respuestasPerfil: any = [];

  opcionSeleccionada: number = 0;
  AnalisisObjetivo: Record<string, number> = {};
  ResultadoPerfilObjetivo: string = "";
  PerfilSubjetivoObtenido: string = "";

  dataPerfil = [
    {
      descripcion: "Se caracteriza por buscar inversiones que representen un crecimiento moderado, sin asumir riesgos importantes, priorizando tener una disponibilidad inmediata de sus inversiones y buscando minimizar la incidencia de las fluctuaciones del mercado.",
      url: "assets\\image\\perfil-conservador.jpeg",
    }, {
      descripcion: "Se encuentra dispuesto a asumir ciertas oscilaciones en sus inversiones, esperando que en un mediano largo plazo pueda obtener una mayor rentabilidad. Es un perfil intermedio, tratándose de personas que pueden tolerar cierto riesgo en sus inversiones a cambio de una mayor rentabilidad.",
      url: "assets\\image\\perfil-moderado.jpeg",
    }, {
      descripcion: "Se caracteriza por inversores cuyo objetivo principal es maximizar el rendimiento de su cartera, asumiendo para ello un alto componente de riesgo. Están dispuestos a mantener sus inversiones por períodos largos, sin asignarle una alta prioridad a la disponibilidad inmediata de sus activos.",
      url: "assets\\image\\perfil-agresivo.jpeg",
    }
  ]

  urlperfilimage: string = "";
  descripcionperfil: string = "";

  dataurlcertificado = ""
  public qrCodeDownloadLink: SafeUrl = "";

  loading: boolean = false;

  perfilInversorUsuario: PerfilInversorAPI = {
    oid: 0,
    version: 0,
    horizonteTemporal: 0,
    toleranciaRiesgo: 0,
    tipoPerfilSubjetivo: "",
    nivelConocimiento: 0,
    tipoNivelConocimiento: "",
    perfilInversor: "",
    UsuarioDTO: {
      oid: 0,
      pass: "",
      username:"",
      nombreUsuario: "",
      nombre: "",
      apellido: "",
      email: "",
      cuentaConfirmada: false,
      activo: false,
    },

  }

  constructor(private preguntaObjetivasServiceAPI_: QuestionsTargetService,
    private router: Router, private preguntaObjetivasServiceLocal_: PreguntaObjetivasService,
    private localStorageService: LocalStorageService, private carteraService: CarteraService) {
  }

  ngOnInit(): void {
    this.loading = true;
    /*********Area Preguntas onjetivas*********/
    const storedProfile = this.localStorageService.getItem('perfil');
    // this.AnalisisObjetivo["toleranciaRiesgo"] = this.localStorageService.getItem('toleranciaRiesgo');
    // this.AnalisisObjetivo["horizonteTemporal"] = this.localStorageService.getItem('horizonteTemporal');
    if (storedProfile) {
      this.PerfilSubjetivoObtenido = storedProfile;
    }

    this.preguntaObjetivasServiceAPI_.obtenerTestObjetivo(this.PerfilSubjetivoObtenido)
      .then((testSubjetivo) => {
        this.resPreguntas = testSubjetivo;
        if (this.resPreguntas == null || this.resPreguntas.length == 0) {
          this.preguntaObjetivasServiceLocal_.getPreguntas(this.PerfilSubjetivoObtenido).
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
          console.error("Error al obtener datos del API:", error);
          this.preguntaObjetivasServiceLocal_.getPreguntas(this.PerfilSubjetivoObtenido).
            subscribe((data: PreguntaApi[]) => {
              this.resPreguntas = data;
              this.loadQuestions();
            });
        }
      )
      .finally(() => {
        // this.Username = this.localStorageService.getItem("Username");
        this.perfilInversorUsuario = this.localStorageService.GetPerfilActualLocal();
        this.Username= this.perfilInversorUsuario.UsuarioDTO.username; 
        this.loading = false;
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
          ////Objeto general

          this.perfilInversorUsuario.perfilInversor = this.respuestasPerfil.perfilInversor;

          // this.localStorageService.SetPerfilActualLocal();

        }).finally(() => {
          this.acreditarDinero();
          this.armardescripcion();
          this.dataurlcertificado = this.preguntaObjetivasServiceAPI_.solicitarlinkCertificadoLocal(usuario, this.ResultadoPerfilObjetivo);
        }
        );;

        const usuario = this.Username;
        // this.dataurlcertificado= this.preguntaObjetivasServiceAPI_.solicitarlinkCertificado(usuario,this.ResultadoPerfilObjetivo);


        this.isLastQuestion = true;// Habilita Control de pregunta finalizada y habilita boton para volver al home
        this.buttonText = 'Obtener portfolio sugerido';//Podria unificar el loadRoadMap y que sea un control en lugar de cambiar botones

      }
    } else {
      console.error('Error: Fin de preguntas válidos-');
    }
  }

  public acreditarDinero() {
    this.carteraService.acreditarDinero(5000, "premio preguntas objetivas");
  }

  public async entregarResultados(): Promise<any> {
    if (!this.validateData()) {
      return;
    }
    this.perfilInversorUsuario.nivelConocimiento = this.AnalisisObjetivo["Conocimento"];
  
    try {
      
      // const data = await from(this.preguntaObjetivasServiceAPI_.TestObjetivoResultados(this.AnalisisObjetivo,this.Username)).toPromise();
      const data = await from(this.preguntaObjetivasServiceAPI_.TestObjetivoResultadosObtenidos(this.perfilInversorUsuario)).toPromise();
      // data && data.perfilInversor
      if (data?.perfilInversor) {
        this.respuestasPerfil = data;
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

  armardescripcion() {

    switch (this.ResultadoPerfilObjetivo) {
      case "CONSERVADOR":
        this.urlperfilimage = this.dataPerfil[0].url;
        this.descripcionperfil = this.dataPerfil[0].descripcion;
        break;
      case "MODERADO":
        this.urlperfilimage = this.dataPerfil[1].url;
        this.descripcionperfil = this.dataPerfil[1].descripcion;
        break;
      case "AGRESIVO":
        this.urlperfilimage = this.dataPerfil[2].url;
        this.descripcionperfil = this.dataPerfil[2].descripcion;
        break;
      default:
        this.ResultadoPerfilObjetivo = "CONSERVADOR"
        this.urlperfilimage = this.dataPerfil[0].url;
        this.descripcionperfil = this.dataPerfil[0].descripcion;
        break;
    }

  }
  validateData() {
    return true;
  }

  guardarRespuestas() {
    console.log("Entrando en guardar respuestas");
    console.log(this.AnalisisObjetivo["Conocimento"]);
    if (!this.AnalisisObjetivo["Conocimento"]) {
      this.AnalisisObjetivo["Conocimento"] = 0;
    }
    this.AnalisisObjetivo["Conocimento"] += this.opcionSeleccionada;
    this.opcionSeleccionada = 0;
    console.log("Ver respuestas almacenadas");
    console.log(this.AnalisisObjetivo["Conocimento"]);
  }

  async solicitarcertificado() {
    const usuario = this.Username;

    this.preguntaObjetivasServiceAPI_.verinforme(usuario);
  }

  async descargarCertificado() {
    const usuario = this.Username;
    try {
      const respuestaAxios = await this.preguntaObjetivasServiceAPI_.obtenerinforme(usuario);
      if (respuestaAxios) {
        const archivoBlob: Blob = respuestaAxios;
        const url = window.URL.createObjectURL(archivoBlob);
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.style.display = 'none';
        a.href = url;
        a.download = 'Certificado Mercado Junior.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      // Si la solicitud al servidor remoto falla, intenta obtener el certificado local
      try {
        const respuestaLocal = await this.preguntaObjetivasServiceAPI_.obtenercertificadoLocal(this.ResultadoPerfilObjetivo);

        if (respuestaLocal) {
          const archivoBlob: Blob = respuestaLocal;
          const url = window.URL.createObjectURL(archivoBlob);
          const a = document.createElement('a');
          document.body.appendChild(a);
          a.style.display = 'none';
          a.href = url;
          a.download = 'Certificado Mercado Junior.pdf';
          a.click();
          window.URL.revokeObjectURL(url);
        }
      } catch (error) {
        console.error('Error al obtener el certificado: ', error);
      }
    }

  }

  onChangeURL(url: SafeUrl) {
    this.qrCodeDownloadLink = url;
  }

  loadSugerencias(): void {
    this.buttonText = 'Continuar';
    this.issugerencia = true;
  }

  isArray(respuestas: string[] | RespuestaAPI[]): respuestas is string[] {
    return Array.isArray(respuestas);
  }

  loadHome(): void {
    this.router.navigate(['/dashboard/precios']);
    this.buttonText = 'Continuar';
  }

}
