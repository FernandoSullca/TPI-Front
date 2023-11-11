import { Component, OnInit } from '@angular/core';
import { HistoricoInstrumento, RendimientoTotalInstrumento } from 'src/app/core/models/rendimiento/rendimiento';

@Component({
  selector: 'app-rendimiento',
  templateUrl: './rendimiento.component.html',
  styleUrls: ['./rendimiento.component.scss']
})
export class RendimientoComponent implements OnInit {
  public rendimientoInstrumento!: RendimientoTotalInstrumento[];
  public historicoInstrumento!: HistoricoInstrumento[];
  public historico1!: HistoricoInstrumento[];
  public typeMessage: string = '';


  ngOnInit(): void {
    this.obtenerRendimientoTotal();
  }
  obtenerRendimientoTotal() {
    this.rendimientoInstrumento = [
      {
        simbolo: 'AAPL',
        cantidad: 10,
        ultimoPrecio: 160,
        precioInicialDeCompra: 150,
        totalPorcentajeGeneral: 6.67,
        totalGananaciaPerdidaPesos: 100,
        totalValorizadoPesos: 1600
      },
      {
        simbolo: 'GOOGL',
        cantidad: 5,
        ultimoPrecio: 3000,
        precioInicialDeCompra: 2800,
        totalPorcentajeGeneral: 7.14,
        totalGananaciaPerdidaPesos: 1000,
        totalValorizadoPesos: 15000
      },
      {
        simbolo: 'MSFT',
        cantidad: 8,
        ultimoPrecio: 320,
        precioInicialDeCompra: 300,
        totalPorcentajeGeneral: 6.67,
        totalGananaciaPerdidaPesos: 160,
        totalValorizadoPesos: 2560
      }
    ];

  }
  obtenerHistoricoInstrumento(simbolo: string) {
    this.historico1 = [
      {
        simbolo: simbolo,
        cantidad: 10,
        fecha: new Date('2023-11-08'),
        porcentajeRendimiento: 1.5,
        gananciaPerdidaDiaria: 15,
        totalValorizadoDiario: 1600
      },
      {
        simbolo: simbolo,
        cantidad: 10,
        fecha: new Date('2023-11-09'),
        porcentajeRendimiento: -0.8,
        gananciaPerdidaDiaria: -8,
        totalValorizadoDiario: 1585
      },
      {
        simbolo: simbolo,
        cantidad: 10,
        fecha: new Date('2023-11-10'),
        porcentajeRendimiento: 2.3,
        gananciaPerdidaDiaria: 23,
        totalValorizadoDiario: 1620
      }
    ];
  }
  public mostrarVariacionPorcentual(valor: number) {
    let textoPorcentual :string;
    if (valor > 0) {
      this.typeMessage = 'success';
      textoPorcentual = `+${valor.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`;
    } else {
      this.typeMessage = 'error';
      textoPorcentual = `${valor.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`;
    }
    return textoPorcentual;
  }
  public mostrarVariacionMonto(valor: number) {
    let textoMonto :string;
    if (valor > 0) {
      this.typeMessage = 'success';
      textoMonto = `+${valor.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    } else {
      this.typeMessage = 'error';
      textoMonto = `${valor.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return textoMonto;
  }
}
