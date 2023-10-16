import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarteraService } from 'src/app/core/services/api/cartera/cartera.service';
import { Cartera } from 'src/app/core/models/cartera/cartera';
// import { GraficoComponent } from '../grafico/grafico.component';


@Component({
  selector: 'app-cartera',
  templateUrl: './cartera.component.html',
  styleUrls: ['./cartera.component.scss']
})
export class CarteraComponent implements OnInit {

  constructor(private carteraService: CarteraService, private router: Router) { }

  cartera: Cartera | undefined;

  ngOnInit(): void {
    this.getCartera();
  }
  getCartera() {
    return this.carteraService.getCartera().subscribe((response) => {
      const { totalCartera = '', totalInstrumentos = '', totalMonedas = '' } = response;
      const responseFormated: Cartera = {
        ...response,
        totalCartera: Number((Math.round(Number(totalCartera) * 100) / 100).toFixed(2)),
        totalInstrumentos: Number((Math.round(Number(totalInstrumentos) * 100) / 100).toFixed(2)),
        totalMonedas: Number((Math.round(Number(totalMonedas) * 100) / 100).toFixed(2)),
      }
      this.cartera = responseFormated
    });
  }
  mostrarValuacionTotalCartera(): number {
    if (this.cartera?.totalCartera)
      return this.cartera?.totalCartera
    else
      return 0
  }
}
