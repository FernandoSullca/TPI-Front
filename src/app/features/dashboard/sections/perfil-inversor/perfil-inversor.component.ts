import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-inversor',
  templateUrl: './perfil-inversor.component.html',
  styleUrls: ['./perfil-inversor.component.scss']
})
export class PerfilInversorComponent {

  constructor(private router: Router) {
    // customize default values of progress bars used by this component tree
  }

  loadStages() { 
    let url: string = './dashboard/perfil-inversor-questions';
    // let fullUrl = url.concat((this.tematica).toLocaleLowerCase());
    this.router.navigate([url]);
  }
}
