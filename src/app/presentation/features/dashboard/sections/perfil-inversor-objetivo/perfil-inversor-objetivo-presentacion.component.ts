import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-inversor-objetivo-presentacion',
  templateUrl: './perfil-inversor-objetivo-presentacion.component.html',
  styleUrls: ['./perfil-inversor-objetivo-presentacion.component.scss']
})
export class PerfilInversorObjetivoPresentacionComponent implements OnInit{
  perfilObjetivoActual? : string|null|undefined;
  constructor(private router: Router) {
    // customize default values of progress bars used by this component tree
  }
  ngOnInit(): void {
    this.obtenerPerfilObjetivo()
  }

  loadStages() { 
    let url: string = './dashboard/perfil-inversor-cuestionario';
    this.router.navigate([url]);
  }
  loadHome(): void {
    this.router.navigate(['/dashboard/precios']);
  }
  obtenerPerfilObjetivo(){
    const resultadoObjetivo = localStorage.getItem('perfilinversor');
    if(resultadoObjetivo){
      this.perfilObjetivoActual = JSON.parse(resultadoObjetivo);
    }
    
  }
}
