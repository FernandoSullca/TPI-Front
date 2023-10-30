import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalIsOpen = false;
  private modalClosedSubject = new Subject<void>();

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
