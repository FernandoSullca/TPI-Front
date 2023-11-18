import { Component, OnInit } from '@angular/core';
import { HistoricoInstrumento, RendimientoTotalInstrumento } from 'src/app/core/models/rendimiento/rendimiento';
import { RendimientoService } from 'src/app/core/services/api/rendimiento/rendimiento.service';

@Component({
  selector: 'app-rendimiento',
  templateUrl: './rendimiento.component.html',
  styleUrls: ['./rendimiento.component.scss']
})
export class RendimientoComponent implements OnInit {
  public rendimientoInstrumento!: RendimientoTotalInstrumento[];
  public historico1!: HistoricoInstrumento[];
  public typeMessage: string = '';
  public loading = false;
  constructor(private rendimientoService: RendimientoService) { }

  ngOnInit(): void {
    this.obtenerRendimientoTotal();
  }
  public parseoValorString(valor: number) {
    return valor.toString();
  }
  public validacionDeSigno(valor: number) {
    return valor > 0 ? 'success' : 'error'
  }
  obtenerHistoricoInstrumento(simbolo: string) {
    this.rendimientoService.obtenerHistoricoInstrumento(simbolo).then((rendimiento) => {
      // Accede a la propiedad rendimientosActuales
      var rendimientosActuales = rendimiento

      // Recorre las propiedades dentro de rendimientosActuales
      const keys = Object.keys(rendimientosActuales);
      const nuevo = keys.map((clave) => {
        const rendimiento = rendimientosActuales[clave];
        return {
          simbolo: rendimiento.simbolo,
          cantidad: rendimiento.cantidadDeTitulos,
          fecha: rendimiento.fecha,
          porcentajeRendimiento: rendimiento.rendimientoTotalPorcentaje,
          gananciaPerdidaDiaria: rendimiento.rendimientoTotal,
          totalValorizadoDiario: rendimiento.valorInversion
        };
      })

      this.historico1 = nuevo;

      return this.historico1;

    }).catch((error) => {
      return [];
    });

  }
  obtenerRendimientoTotal() {
    this.loading = true;

    this.rendimientoService.getRendimiento().then((rendimiento) => {
      // Accede a la propiedad rendimientosActuales
      var rendimientosActuales = rendimiento.rendimientosActuales;

      // Recorre las propiedades dentro de rendimientosActuales
      const keys = Object.keys(rendimientosActuales);

      const nuevo = keys.map((clave) => {
        const rendimiento = rendimientosActuales[clave];
        return {
          simbolo: rendimiento.simbolo,
          cantidad: rendimiento.cantidadDeTitulos,
          ultimoPrecio: 0,
          precioInicialDeCompra: 0,
          totalPorcentajeGeneral: rendimiento.rendimientoTotalPorcentaje,
          totalGananaciaPerdidaPesos: rendimiento.rendimientoTotal,
          totalValorizadoPesos: rendimiento.valorActualDeLaInversion
        };
      })

      this.rendimientoInstrumento = nuevo;
      this.loading = false;

      return this.rendimientoInstrumento;

    }).catch((error) => {
      this.loading = false;

      return [];
    });



  }
}