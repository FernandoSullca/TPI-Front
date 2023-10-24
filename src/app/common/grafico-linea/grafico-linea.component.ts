import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-grafico-linea',
  templateUrl: './grafico-linea.component.html',
  styleUrls: ['./grafico-linea.component.scss']
})
export class GraficoLineaComponent implements OnInit {
  public chart: any;

  ngOnInit(): void {
    this.createChart();
  }

  createChart() {
    const currentDate = new Date();
    const months = [];
    const salesData = [];
    
    for (let i = 0; i < 8; i++) {
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();
      months.unshift(`${year}-${month < 10 ? '0' + month : month}-01`);
      salesData.unshift(this.getRandomSalesValue());
      currentDate.setMonth(currentDate.getMonth() - 1);
    }

    this.chart = new Chart("MyChart", {
      type: 'line',
      data: {
        labels: months,
        datasets: [
          {
            label: "Progreso",
            data: salesData,
            tension:0.1,
            fill:false,
            borderColor: '#3261A8', 
            backgroundColor: '#3261A8',
            pointBackgroundColor: '#3261A8)'
          },
        ]
      },
      options: {
        aspectRatio: 2,
        responsive: true,
      }
    });
  }

  getRandomSalesValue() {
    // Esta función podría devolver valores de ventas aleatorios o cargar los datos desde una fuente externa.
    return Math.floor(Math.random() * (5000 - 100) + 100);
  }
}
