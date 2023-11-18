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
  tituloGraficoLinea: string = "Precio Dolar";

  ngOnInit(): void {
    this.obtenerPrediccionPrecioDolar();
  }
  obtenerPrediccionPrecioDolar() {
    return this.prediccionPrecioService.getPrediccionPrecio().subscribe((response) => {
      console.log("🚀 ~ file: prediccion.component.ts:26 ~ PrediccionComponent ~ returnthis.prediccionPrecioService.getPrediccionPrecio ~ response:", response)
      this.prediccionPrecio = {
        dolar: response.dolar.map((dolarItem) => {
          return { fecha: this.convertirFecha(dolarItem.fecha || ''), precio: dolarItem.precio }
        }
        )
      };
    })
  }


  convertirFecha(fechaString: string) {
    const parts = fechaString.split("-");
    const day = parts[2];
    const month = parts[1];
    const year = parts[0];
    const newString = `${day}-${month}-${year}`;
    return newString;
  }
}
