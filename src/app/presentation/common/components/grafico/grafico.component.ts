import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.scss']
})
export class GraficoComponent implements OnInit{
  @Input() tipoGrafico : ChartType | undefined;
  @Input() tituloGrafico : string ='';
  @Input() datosGrafico : any ;
  label:string='Rendimiento';


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
  
  ngOnInit(): void {
    this.actualizarArray();
  }

  
  public opcionesGrafico: ChartConfiguration['options'] = {
    maintainAspectRatio:false,
    plugins: {
      title:{
        display:true,
        text:this.tituloGrafico,
        color:'#00000',
        align:'center',
        position:'bottom',
        fullSize: false,
        font:{
          size:18,
        }
      },

      legend: {
        display: true,
        position: 'right',
        labels:{
          color:'#00000'
          
        }
      },
      tooltip:{
        enabled:true,
      },
    },
  };

  public grafico: ChartData ={
    labels: [], // Etiquetas en formato de arreglo de cadenas
    datasets: [
      {
        data: [],
        backgroundColor:this.colores
      },
    ],
  };

  ngOnChanges(changes: SimpleChanges) {
    this.actualizarArray();
    // Check if the `datosGrafico` input has changed.
    if (changes['datosGrafico']) {
      if (this.datosGrafico) {
        // Check if the `tipoGrafico` input is set to `line`.
        if (this.tipoGrafico === 'line') {
        } else {
          // Update the chart data for a pie chart.
          this.grafico.labels = Object.keys(this.datosGrafico);
          this.grafico.datasets[0].data = Object.values(this.datosGrafico);
        }
      } else {
        // En caso de que los datos sean nulos o no válidos, establece el gráfico en blanco o con datos predeterminados.
        this.grafico.labels = [];
        this.grafico.datasets[0].data = [];
      }
    }
    // Check if the `tituloGrafico` input has changed.
    if (changes['tituloGrafico']) {
      this.actualizarTitulo();
    }
  }
  
  actualizarArray(){
    const arrayIntrumentos = Object.assign({}, this.datosGrafico);
    for(const key in arrayIntrumentos){
      if(arrayIntrumentos[key]== 0)
        delete arrayIntrumentos[key];
    };
    this.datosGrafico=arrayIntrumentos;
  }
  actualizarTitulo() {
    if(this.opcionesGrafico?.plugins?.title)
      this.opcionesGrafico.plugins.title.text = this.tituloGrafico;
  }

}
