import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'src/core/services/LocalStorage/local-storage.service';
import { QRLocalService } from 'src/core/services/dataLocalServices/QR/qrlocal.service';

@Component({
  selector: 'app-perfil-subjetivo-resultado',
  templateUrl: './perfil-subjetivo-resultado.component.html',
  styleUrls: ['./perfil-subjetivo-resultado.component.scss']
})
export class PerfilSubjetivoResultadoComponent implements OnInit {
  dataPerfil = [
    {
      conservador: "Se caracteriza por buscar inversiones que representen un crecimiento moderado, sin asumir riesgos importantes, priorizando tener una disponibilidad inmediata de sus inversiones y buscando minimizar la incidencia de las fluctuaciones del mercado.",
      url: "src\\assets\\image\\perfil-conservador.jpeg",
    }, {
      moderado: "Se encuentra dispuesto a asumir ciertas oscilaciones en sus inversiones, esperando que en un mediano largo plazo pueda obtener una mayor rentabilidad. Es un perfil intermedio, tratándose de personas que pueden tolerar cierto riesgo en sus inversiones a cambio de una mayor rentabilidad.",
      url: "src\\assets\\image\\perfil-moderado.jpeg",
    }, {
      Arriesgado: "Se caracteriza por inversores cuyo objetivo principal es maximizar el rendimiento de su cartera, asumiendo para ello un alto componente de riesgo. Están dispuestos a mantener sus inversiones por períodos largos, sin asignarle una alta prioridad a la disponibilidad inmediata de sus activos.",
      url: "src\\assets\\image\\perfil-agresivo.jpeg",
    }
  ]

  isLoading: boolean = true;
  URLQRPerfil:string="";
  respPerfilResultante:string="";
  urlperfilimage: string = "";
  buttonText: string="FINALIZAR";
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private QrLocal:QRLocalService) {

  }

  ngOnInit(): void {

    const storedProfile = this.localStorageService.getItem('perfil');
    if (storedProfile) {
    this.respPerfilResultante = storedProfile;  
    this.URLQRPerfil=this.QrLocal.solicitarQRLocal(this.respPerfilResultante);
    this.isLoading=false;
    }

  }

  loadHome(): void {
    this.router.navigate(['/dashboard/precios']);
  }
  
  loadPagePerfilObjetivo(): void {

    this.router.navigate(['dashboard/perfil-inversor']);

  }

}
