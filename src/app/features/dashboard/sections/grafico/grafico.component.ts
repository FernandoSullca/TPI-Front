import { Component, Input, SimpleChanges } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.scss']
})
export class GraficoComponent {

  @Input() cantidadPorInstrumento: any; 

  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
    },
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [], // Etiquetas en formato de arreglo de cadenas
    datasets: [
      {
        data: [],
      },
    ],
  };
  

  public pieChartType: ChartType = 'pie';
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['cantidadPorInstrumento'] && this.cantidadPorInstrumento) {
      this.pieChartData.labels = Object.keys(this.cantidadPorInstrumento);
      this.pieChartData.datasets[0].data = Object.values(this.cantidadPorInstrumento);
    }
  }
}
