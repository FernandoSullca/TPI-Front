import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarteraService } from 'src/app/core/services/api/cartera/cartera.service';
import { Cartera } from 'src/app/core/models/cartera/cartera';
import { DolarBolsa } from 'src/app/core/models/dolar-bolsa/dolar-bolsa';
import { ChartType } from 'chart.js';


@Component({
  selector: 'app-cartera',
  templateUrl: './cartera.component.html',
  styleUrls: ['./cartera.component.scss']
})
export class CarteraComponent implements OnInit {

  constructor(private carteraService: CarteraService, private router: Router) { }
  datosGrafico : any;
  tipoGrafico: ChartType = 'pie';
  tipoGraficoLinea: ChartType = 'line';
  totalValorizadoNulo: number = 0;
  cartera: Cartera | undefined;
  valorActualDolarMEP: DolarBolsa | undefined;
  fechaCompletaDolarMEP: string = '';
  tituloGraficoTorta : string ="Instrumentos en posesión";
  tituloGraficoLinea : string ="Mi progreso";

  ngOnInit(): void {
    this.getCartera();
    this.generarAleatorioTotalValorizado()
  }
  // core      |||||   component
  // llamado a api  !== exceso logica en componente angular
  /// local-storage.service
  getCartera() {
    return this.carteraService.getCartera().subscribe((response) => {
      const { totalCartera = '', totalInstrumentos = '', totalMonedas = '' } = response;

      // TODO limpiar
      const responseFormated: Cartera = {
        ...response,
        totalCartera: Number(totalCartera),
        totalInstrumentos: Number(totalInstrumentos),
        totalMonedas: Number(totalMonedas),
      }
      this.cartera = responseFormated
    });
  }
  mostrarValuacionTotalCartera(): number {
    if (this.cartera?.totalCartera)
      return this.cartera?.totalCartera
    else
      return 0
  }
  direccionar(componente: string) {
    this.router.navigate([`/dashboard/${componente}`]);
  }
  obtenerPrecioDolarMEP() {
    return this.carteraService.getPrecioDolarMEP().subscribe((response) => {
      this.valorActualDolarMEP = response;
      const fecha = (new Date(this.valorActualDolarMEP.fechaActualizacion)).toLocaleString();
      this.fechaCompletaDolarMEP = fecha;
    })
  }
  // TODO limpiar
  generarAleatorioTotalValorizado() {
    const aleatorios = [];
    let valorInicial = 4000;
    const maxFluctuacion = 200;
    
    for (let i = 0; i < 20; i++) {
      const valorActual = valorInicial + Math.random() * maxFluctuacion;
      aleatorios.push({ [i]: valorActual });
      valorInicial = valorActual;
    }
    
    const formattedData = {
      "Progreso": aleatorios
    };
    
    this.datosGrafico = formattedData;
  }
  
}
