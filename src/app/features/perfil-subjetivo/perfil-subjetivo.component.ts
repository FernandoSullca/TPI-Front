import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-subjetivo',
  templateUrl: './perfil-subjetivo.component.html',
  styleUrls: ['./perfil-subjetivo.component.scss']
})
export class PerfilSubjetivoComponent {


  constructor(private router: Router) {
    // customize default values of progress bars used by this component tree
  }
  loadStages() { 
    let url: string = '/perfil-inversor';
    // let fullUrl = url.concat((this.tematica).toLocaleLowerCase());
    this.router.navigate([url]);
  }
}
