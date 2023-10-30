import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-subjetivo',
  templateUrl: './perfil-subjetivo.component.html',
  styleUrls: ['./perfil-subjetivo.component.scss']
})
export class PerfilSubjetivoComponent {


  constructor(private router: Router) {
  }
  loadStages() { 
    let url: string = '/perfil-inversor';
    this.router.navigate([url]);
  }
}
