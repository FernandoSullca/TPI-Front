import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PortfolioSugerido } from 'src/app/core/models/portfolio-sugerido/portfolio-sugerido';
import { ModalService } from 'src/app/core/services/serviceModal/modal.service';

@Component({
  selector: 'app-modal-sugerido',
  templateUrl: './modal-sugerido.component.html',
  styleUrls: ['./modal-sugerido.component.scss']
})
export class ModalSugeridoComponent {
  @Input() portfolioSugerido!: PortfolioSugerido[];
  elementosArray: any []=[];
  
  constructor(public modalService: ModalService, private router : Router){}

  public cerrarModal(){
    this.modalService.closeModal();
  }
  direccionar(componente: string) {
    this.router.navigate([`/dashboard/${componente}`]);
    this.cerrarModal();
  }
}
