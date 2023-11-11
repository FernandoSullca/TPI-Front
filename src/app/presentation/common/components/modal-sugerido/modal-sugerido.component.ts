import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PortfolioSugerido } from 'src/app/core/models/portfolio-sugerido/portfolio-sugerido';
import { PortfolioSugeridoService } from 'src/app/core/services/api/portfolio-sugerido/portfolio-sugerido.service';
import { PricePanelService } from 'src/app/core/services/api/price-panel/price-panel.service';
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
    // if (this.portfolioSugerido.length > 0) {
    //   this.instrumentoSeleccionadoId = this.portfolioSugerido[0].oid;
    // }  VERIFICAR PORQUE ROMPE AL SELECCIONAR EL PRIMER INSTRUMENTO EN PANEL DE PRECIOS PARA MOSTRAR GRAFICO
  }
  
  
  constructor(public modalService: ModalService, private router : Router,private portfolioSugeridoService : PortfolioSugeridoService,
    private dashboardComponent: DashboardComponent,private pricePanelService : PricePanelService  ){}

  public cerrarModal(){
    this.modalService.closeModal();
  }
  irAComprarInstrumento(simbolo : string) {
    this.router.navigate([`/dashboard/precios`]);
    this.cerrarModal();
    this.pricePanelService.setearSimboloDePortafolioSugerido(simbolo);
  }
  obtenerNuevoPortfolioSugerido(){
    this.portfolioSugeridoService.obtenerNuevoPortfolioSugerido(this.instrumentoSeleccionadoId).subscribe(response => {
      this.dashboardComponent.portfolioSugerido = response;
    });
  }
  
}
