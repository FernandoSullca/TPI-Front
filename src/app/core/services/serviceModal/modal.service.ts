import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(){}
  private modalIsOpen = false;

  openModal() {
    this.modalIsOpen = true;
  }

  closeModal() {
    this.modalIsOpen = false;
  }

  isModalOpen() {
    return this.modalIsOpen;
  }
}
