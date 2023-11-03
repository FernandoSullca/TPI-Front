import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PortfolioSugerido } from 'src/app/core/models/portfolio-sugerido/portfolio-sugerido';
import { PortfolioSugeridoService } from 'src/app/core/services/api/portfolio-sugerido/portfolio-sugerido.service';
import { ModalService } from 'src/app/core/services/serviceModal/modal.service';
import { DashboardComponent } from 'src/app/presentation/features/dashboard/dashboard.component';

@Component({
  selector: 'app-modal-sugerido',
  templateUrl: './modal-sugerido.component.html',
  styleUrls: ['./modal-sugerido.component.scss']
})
export class ModalSugeridoComponent {
  @Input() portfolioSugerido!: PortfolioSugerido[];
  elementosArray: any []=[];

  public instrumentoSeleccionadoId: number = 0;

  
  public ngOnInit(): void {
    // debugger;
    if (this.portfolioSugerido.length > 0) {
      this.instrumentoSeleccionadoId = this.portfolioSugerido[0].oid;
    }
  }
  
  
  constructor(public modalService: ModalService, private router : Router,private portfolioSugeridoService : PortfolioSugeridoService, private dashboardComponent: DashboardComponent){}

  public cerrarModal(){
    this.modalService.closeModal();
  }
  direccionar(componente: string) {
    this.router.navigate([`/dashboard/${componente}`]);
    this.cerrarModal();
  }
  obtenerNuevoPortfolioSugerido(){
    // debugger;
    this.portfolioSugeridoService.obtenerNuevoPortfolioSugerido(this.instrumentoSeleccionadoId).subscribe(response => {
      // debugger;
      this.dashboardComponent.portfolioSugerido = response;
    });
  }
}
