import { Component, Input, SimpleChanges } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.scss']
})
export class GraficoComponent{
  @Input() tipoGrafico : ChartType | undefined;
  @Input() cantidadPorInstrumento: any; 

  colores = [
    '#669900',
    '#CC3399',
    '#CCEE66',
    '#006699',
    '#3399CC',
    '#990066',
    '#CC3399',
    '#FF6600',
    '#99CC33',
    '#FFCC00'
  ];

  public pieChartOptions: ChartConfiguration['options'] = {
    maintainAspectRatio:false,
    responsive: true,
    plugins: {
      title:{
        display:true,
        text:'Activos valorizados',
        color:'#00000',
        font:{
          size:20
        }
      },
      legend: {
        display: true,
        position: 'bottom',
        labels:{
          boxWidth:40,
          color:'#00000'
          
        }
      },
      tooltip:{
        enabled:true,
        
      }
    },
  };
  
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [], // Etiquetas en formato de arreglo de cadenas
    datasets: [
      {
        data: [],
        backgroundColor:this.colores
      },
    ],
  };
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['cantidadPorInstrumento'] && this.cantidadPorInstrumento) {
      this.actualizarArray();
      this.pieChartData.labels = Object.keys(this.cantidadPorInstrumento);
      this.pieChartData.datasets[0].data = Object.values(this.cantidadPorInstrumento);
    }
  }
  actualizarArray(){
    const arrayIntrumentos = Object.assign({}, this.cantidadPorInstrumento);
    for(const key in arrayIntrumentos){
      if(arrayIntrumentos[key]== 0)
        delete arrayIntrumentos[key];
    };
    this.cantidadPorInstrumento=arrayIntrumentos;
  }
}
