import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { LocalStorageService } from 'src/app/core/services/LocalStorage/local-storage.service';

@Component({
  selector: 'app-stage-result',
  templateUrl: './stage-result.component.html',
  styleUrls: ['./stage-result.component.scss']
})
export class StageResultComponent implements OnInit {
  dataPerfil = [
    {
      conservador: "Se caracteriza por buscar inversiones que representen un crecimiento moderado, sin asumir riesgos importantes, priorizando tener una disponibilidad inmediata de sus inversiones y buscando minimizar la incidencia de las fluctuaciones del mercado.",
      url:"src\\assets\\image\\perfil-conservador.jpeg",
    }, {
      moderado: "Se encuentra dispuesto a asumir ciertas oscilaciones en sus inversiones, esperando que en un mediano largo plazo pueda obtener una mayor rentabilidad. Es un perfil intermedio, tratándose de personas que pueden tolerar cierto riesgo en sus inversiones a cambio de una mayor rentabilidad.",
      url:"src\\assets\\image\\perfil-moderado.jpeg",
    }, {
      Arriesgado: "Se caracteriza por inversores cuyo objetivo principal es maximizar el rendimiento de su cartera, asumiendo para ello un alto componente de riesgo. Están dispuestos a mantener sus inversiones por períodos largos, sin asignarle una alta prioridad a la disponibilidad inmediata de sus activos.",
      url:"src\\assets\\image\\perfil-agresivo.jpeg",
    }
  ]
urlperfilimage:string="";
  valorRecibido: any;
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService) {
  
  }

  ngOnInit(): void {

    const storedProfile = this.localStorageService.getItem('perfil');
    if (storedProfile) {
      this.valorRecibido = storedProfile;

  
    }

  }

  loadHome(): void {
    this.router.navigate(['/dashboard/precios']);
  }
  loadStages() {
    let url: string = './dashboard/perfil-inversor-cuestionario';
    this.router.navigate([url]);
  }

}
