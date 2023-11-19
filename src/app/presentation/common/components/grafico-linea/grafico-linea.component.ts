import { Component, Input, OnInit } from '@angular/core';
import { Chart, ChartType } from 'chart.js';

@Component({
  selector: 'app-grafico-linea',
  templateUrl: './grafico-linea.component.html',
  styleUrls: ['./grafico-linea.component.scss']
})
export class GraficoLineaComponent implements OnInit {
  public chart: any;
  @Input() tipoGrafico: ChartType | undefined;
  @Input() tituloGrafico: string = '';
  @Input() datosGrafico: any[] = [];

  ngOnInit(): void {
    this.createChart();
  }
  responsiveChart() {
    if (window.screen.width > 800) {
      return 1 | 2
    }
    return 0.5 | 1
  }
  createChart() {
    const currentDate = new Date();
    const months = [];
    const salesData = [];
    const ejex = this.datosGrafico.length > 0 && this.datosGrafico.map((data: any) => data.fecha)
    const ejey = this.datosGrafico.length > 0 && this.datosGrafico.map((data: any) => data.precio)

    for (let i = 0; i < 8; i++) {
      const month = this.getSpanishMonth(currentDate.getMonth());
      months.unshift(month);
      salesData.unshift(this.getRandomSalesValue());
      currentDate.setMonth(currentDate.getMonth() - 1);
    }
    const skipped = (ctx: any, value: any) => ctx.p0.skip || ctx.p1.skip ? value : undefined;
    const down = (ctx: any, value: any) => ctx.p0.parsed.y > ctx.p1.parsed.y ? value : undefined;
    const dolarData = ejey && ejey.slice(5, 10) || [];
    const dolarFuture = [NaN, NaN, NaN, NaN, NaN, ...dolarData];
    this.chart = new Chart("MyChart", {
      type: 'line',
      data: {
        labels: ejex || months,
        datasets: [
          {
            label: "Precio dolar real",
            data: ejey && ejey.slice(0, 5) || salesData,
            tension: 0,
            fill: false,
            borderColor: '#198754',
            backgroundColor: '#198754',
            pointBackgroundColor: '#198754'
          },
          {
            label: "Posible precio a futuro",
            data: dolarFuture || salesData,
            segment: {
              borderColor: ctx => skipped(ctx, 'rgb(0,0,0,0.2)') || down(ctx, 'rgb(192,75,75)'),
              borderDash: ctx => skipped(ctx, [6, 6]),

            },
            spanGaps: true,
            tension: 0.2,
            fill: false,
            borderColor: '#3261A8',
            backgroundColor: '#3261A8',
            pointBackgroundColor: '#3261A8'
          },
        ]
      },
      options: {
        aspectRatio: this.responsiveChart(),
        responsive: true,
        resizeDelay: -0.5
      }
    });
  }

  getSpanishMonth(month: any) {
    const mesesEnEspanol = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    return mesesEnEspanol[month];
  }
  getRandomSalesValue() {
    return Math.floor(Math.random() * (56800 - 10000) + 20000);
  }
}
