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
import { ModalService } from 'src/app/core/services/serviceModal/modal.service';
import { PortfolioSugerido } from 'src/app/core/models/portfolio-sugerido/portfolio-sugerido';
import { PortfolioSugeridoService } from 'src/app/core/services/api/portfolio-sugerido/portfolio-sugerido.service';
import { DashboardComponent } from '../../../../dashboard.component';
import { QRLocalService } from 'src/app/core/services/dataLocalServices/QR/qrlocal.service';
@Component({
  selector: 'app-test-perfil-inversor-objetivo',
  templateUrl: './test-perfil-inversor-objetivo.component.html',
  styleUrls: ['./test-perfil-inversor-objetivo.component.scss']
})
export class TestPerfilInversorObjetivoComponent implements OnInit {

  Username: string = "";

  buttonText: string = 'Continuar';

  isLastQuestion: boolean = false;
  currentQuestionIndex: number = 0;
  issugerencia: boolean = false;
  preguntas: PreguntaApi[] = [];
  resPreguntas: PreguntaApi[] = [];

  respuestasPerfil: any = [];

  opcionSeleccionada: number = 0;
  AnalisisObjetivo: Record<string, number> = {};
  public ResultadoPerfilObjetivo: string = "";
  PerfilSubjetivoObtenido: string = "";
  public portfolioSugerido!: PortfolioSugerido[];
  public tipoPerfil: string | undefined
  public perfilSubjetivo: string = "";
  public URLQRPerfil: string = "";

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
    deleted: 0,
    horizonteTemporal: 0,
    toleranciaRiesgo: 0,
    tipoPerfilSubjetivo: "",
    nivelConocimiento: 0,
    tipoNivelConocimiento: "",
    perfilInversor: "",
    resultadoPerfilado: "",
    UsuarioDTO: {
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

  constructor(private preguntaObjetivasServiceAPI_: QuestionsTargetService,
    private router: Router, private preguntaObjetivasServiceLocal_: PreguntaObjetivasService,
    private localStorageService: LocalStorageService, private carteraService: CarteraService,
    public modalService: ModalService, private portfolioSugeridoService: PortfolioSugeridoService,
    private dashboardComponent: DashboardComponent, private qrlocal: QRLocalService) {
  }

  ngOnInit(): void {
    this.loading = true;
    const storedProfile = this.localStorageService.getItem('perfilinversor');
    this.perfilSubjetivo = this.localStorageService.getItem('perfilinversor');

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
        this.perfilInversorUsuario = this.localStorageService.GetPerfilActualLocal();
        this.perfilInversorUsuario.UsuarioDTO = this.localStorageService.GetUsuarioPerfilActualLocal();
        this.Username = this.localStorageService.getItem('Username');
        this.loading = false;
      }
      );

  }

  loadQuestions() {
    this.preguntas[0] = this.resPreguntas[0];
  }


  loadNextQuestion(): void {
    if (this.resPreguntas) {
      this.currentQuestionIndex++;

      this.guardarRespuestas();
      if (this.currentQuestionIndex < this.resPreguntas.length) {

        this.preguntas[0] = this.resPreguntas[this.currentQuestionIndex];

      } else {
        this.entregarResultados().then((data) => {
          this.respuestasPerfil = data;
          this.localStorageService.setItem('perfilinversor', this.respuestasPerfil.perfilInversor);
          this.localStorageService.setItem('perfilObjetivoCartera', this.respuestasPerfil.perfilInversor);
          this.ResultadoPerfilObjetivo = this.respuestasPerfil.perfilInversor;
          this.perfilInversorUsuario.perfilInversor = this.respuestasPerfil.perfilInversor;
        }).finally(() => {
          this.acreditarDinero();
          this.armardescripcion();
          this.URLQRPerfil = this.qrlocal.solicitarQRLocal(this.ResultadoPerfilObjetivo);
          this.dashboardComponent.obtenerPortfolioSugerido(this.ResultadoPerfilObjetivo);
        }
        );;

        this.isLastQuestion = true;
        this.buttonText = 'Obtener portfolio sugerido';

      }
    } else {
      console.error('Error: Fin de preguntas válidos-');
    }
  }

  public acreditarDinero() {

    this.carteraService.acreditarDinero(5000, "premio preguntas objetivas");
  }

  public async entregarResultados(): Promise<any> {
    this.perfilInversorUsuario.nivelConocimiento = this.AnalisisObjetivo["Conocimento"];
    try {
      const data = await from(this.preguntaObjetivasServiceAPI_.TestObjetivoResultadosObtenidos(this.perfilInversorUsuario)).toPromise();
      if (data?.perfilInversor) {
        this.respuestasPerfil = data;
        return this.respuestasPerfil;
      } else {
        console.error('No se recibió una respuesta válida de la API.');

      }
    } catch (error) {
      console.error('Error al enviar los resultados:', error);

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
    if (this.perfilInversorUsuario.UsuarioDTO != null && this.perfilInversorUsuario != null) {
      return true;
    }
    else {
      return false
    }

  }

  guardarRespuestas() {
    if (!this.AnalisisObjetivo["Conocimento"]) {
      this.AnalisisObjetivo["Conocimento"] = 0;
    }
    this.AnalisisObjetivo["Conocimento"] += this.opcionSeleccionada;
    this.opcionSeleccionada = 0;
  }

  async solicitarcertificado() {
    const perfiles: any = {
      "MODERADO": "assets/perfiles/perfil_inversor_moderado.pdf",
      "CONSERVADOR": "assets/perfiles/perfil_inversor_conservador.pdf",
      "AGRESIVO": 'assets/perfiles/perfil_inversor_agresivo.pdf'
    };


    const url = `/${perfiles[this.ResultadoPerfilObjetivo]}`;
    window.open(url);

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
  openModal() {
    this.modalService.openModal();
  }
  public obtenerTipoPerfil() {
    return this.tipoPerfil;
  }
}
