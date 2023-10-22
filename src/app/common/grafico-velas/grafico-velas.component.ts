import { Component, Input } from '@angular/core';
import { createChart } from 'lightweight-charts';
import { SolapaDetalleInstrumento } from 'src/app/core/models/detalle-instrumento/detalle-instrumento';

@Component({
  selector: 'app-grafico-velas',
  templateUrl: './grafico-velas.component.html',
  styleUrls: ['./grafico-velas.component.scss']
})
export class GraficoVelasComponent {
  @Input() solapaDetalleInstrumento!:SolapaDetalleInstrumento;
  chart: any;
  candlestickSeries: any;

  ngOnInit() {
    this.chart = createChart('tv_test', {
      width: 1200,
      height: 450,
      timeScale: {
        visible: true,
        timeVisible: true,
        secondsVisible: true,
      },
    });

    this.candlestickSeries = this.chart.addCandlestickSeries();
    this.solapaDetalleInstrumento.datosGraficoVelas.sort((a, b) => {
      return new Date(a.tiempo).getTime() - new Date(b.tiempo).getTime();
    });

    this.candlestickSeries.setData(this.solapaDetalleInstrumento.datosGraficoVelas.map((detalle) => ({
      time: new Date(detalle.tiempo).getTime() / 1000,
      open: parseFloat(detalle.precioDeApertura),
      high: parseFloat(detalle.maximo),
      low: parseFloat(detalle.minimo),
      close: parseFloat(detalle.precioDeCierre),
    })));

    this.chart.timeScale().fitContent();
  }
}

