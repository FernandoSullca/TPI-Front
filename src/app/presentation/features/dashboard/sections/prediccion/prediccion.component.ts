import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrediccionPrecioService } from 'src/app/core/services/api/prediccion-precios/prediccion-precios.service';
import { PrediccionPrecio } from 'src/app/core/models/prediccion-precio/prediccion-precio';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-prediccion',
  templateUrl: './prediccion.component.html',
  styleUrls: ['./prediccion.component.scss']
})
export class PrediccionComponent {

  constructor(private prediccionPrecioService: PrediccionPrecioService, private router: Router) { }
  prediccionPrecio: PrediccionPrecio | undefined;
  tipoGraficoLinea: ChartType = 'line';
  tipoGrafico: ChartType = 'pie';
  tituloGraficoLinea : string ="Precio Dolar";

  ngOnInit(): void {
    this.obtenerPrediccionPrecioDolar();
  }

  obtenerPrediccionPrecioDolar() {
    return this.prediccionPrecioService.getPrediccionPrecio().subscribe((response) => {
      this.prediccionPrecio = response;
    })
  }
}
