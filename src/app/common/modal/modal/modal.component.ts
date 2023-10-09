import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit{
  @Input() mensaje: String='';
  modalRef: NgbModalRef|undefined;
  ngbModalOptions: NgbModalOptions|undefined;

  @Output() modalClosed: EventEmitter<void> = new EventEmitter<void>();

  constructor(private modalService: NgbModal) {}
  ngOnInit(): void {
    this.mostrarModal(this.mensaje);
  }
  mostrarModal(mensaje:String) {
    this.bloquearAccionConModal();
    this.modalRef = this.modalService.open(mensaje,this.ngbModalOptions);
    setTimeout(() => {
      this.modalRef?.close();
    }, 3000);
    this.modalRef?.closed.subscribe(() => {
      this.modalClosed.emit(); 
    });
  }
  bloquearAccionConModal(){
    this.ngbModalOptions={
      backdrop:'static',
      keyboard:false
    }
  }
}
