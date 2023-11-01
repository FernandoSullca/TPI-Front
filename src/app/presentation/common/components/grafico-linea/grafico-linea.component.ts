import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Chart, ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { Value } from 'sass';

@Component({
  selector: 'app-grafico-linea',
  templateUrl: './grafico-linea.component.html',
  styleUrls: ['./grafico-linea.component.scss']
})
export class GraficoLineaComponent implements OnInit {
  public chart: any;
  @Input() tipoGrafico : ChartType | undefined;
  @Input() tituloGrafico : string ='';
  @Input() datosGrafico : any ;
 
  ngOnInit(): void {
    this.createChart();
  }

  createChart() {
    const currentDate = new Date();
    const months = [];
    const salesData = [];
    const ejex = this.datosGrafico.map((data:any) => data.fecha )
    const ejey = this.datosGrafico.map((data:any)=> data.precio)

    for (let i = 0; i < 8; i++) {
        const month = this.getSpanishMonth(currentDate.getMonth());
        months.unshift(month);
        salesData.unshift(this.getRandomSalesValue());
        currentDate.setMonth(currentDate.getMonth() - 1);
    }

    this.chart = new Chart("MyChart", {
        type: 'line',
        data: {
            labels: ejex || months,
            datasets: [
                {
                    label: "Precio",
                    data: ejey || salesData,
                    tension: 0.1,
                    fill: false,
                    borderColor: '#3261A8', 
                    backgroundColor: '#3261A8',
                    pointBackgroundColor: '#3261A8'
                },
            ]
        },
        options: {
            aspectRatio: 1|2,
            responsive: true,
            resizeDelay: -0.5
        }
    });
}

  getSpanishMonth(month:any) {
    const mesesEnEspanol = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    return mesesEnEspanol[month];
  }
  getRandomSalesValue() {
    return Math.floor(Math.random() * (56800 - 10000) + 20000);
  }
}
