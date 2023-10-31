import { Component } from '@angular/core';
import { ModalService } from 'src/app/core/services/serviceModal/modal.service';

@Component({
  selector: 'app-modal-sugerido',
  templateUrl: './modal-sugerido.component.html',
  styleUrls: ['./modal-sugerido.component.scss']
})
export class ModalSugeridoComponent {
  constructor(public modalService: ModalService){}

  public cerrarModal(){
    this.modalService.closeModal();
  }
}
