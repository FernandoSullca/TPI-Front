import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarteraService } from 'src/app/core/services/api/cartera/cartera.service';
import { CantidadPorInstrumento, Cartera } from 'src/app/core/models/cartera/cartera';

@Component({
  selector: 'app-cartera',
  templateUrl: './cartera.component.html',
  styleUrls: ['./cartera.component.scss']
})
export class CarteraComponent implements OnInit{
  
  constructor(private carteraService : CarteraService, private router: Router) { }

  cartera:Cartera|undefined;
  ngOnInit(): void {
    this.getCartera();
  }
  getCartera(){
    return this.carteraService.getCartera().subscribe((response) => {
      this.cartera=response
    });
  }
  mostrarValuacionTotalCartera():number{
    if(this.cartera?.totalCartera)
      return this.cartera?.totalCartera
    else
      return 0
  }
}
