import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarteraService } from 'src/app/core/services/api/cartera/cartera.service';
import { Cartera } from 'src/app/core/models/cartera/cartera';
import { DolarBolsa } from 'src/app/core/models/dolar-bolsa/dolar-bolsa';
import { ChartType } from 'chart.js';
import { LocalStorageService } from 'src/app/core/services/LocalStorage/local-storage.service';


@Component({
  selector: 'app-cartera',
  templateUrl: './cartera.component.html',
  styleUrls: ['./cartera.component.scss']
})
export class CarteraComponent implements OnInit {

  constructor(private carteraService: CarteraService, private router: Router, private localStorageService: LocalStorageService) { }
  datosGrafico: any;
  tipoGrafico: ChartType = 'pie';
  tipoGraficoLinea: ChartType = 'line';
  totalValorizadoNulo: number = 0;
  cartera: Cartera | undefined;
  valorActualDolarMEP: DolarBolsa | undefined;
  fechaCompletaDolarMEP: string = '';
  tituloGraficoTorta: string = "Instrumentos en posesión";
  tituloGraficoLinea: string = "Mi progreso";
  perfil: string | null | undefined;

  ngOnInit(): void {
    this.getCartera();
    if (this.obtenerTipoNivelConocimiento())
      this.perfil = this.obtenerTipoNivelConocimiento();
  }
  getCartera() {
    return this.carteraService.getCartera().subscribe((response) => {
      this.cartera = this.formatearRespuesta(response);
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
  formatearRespuesta(response: Cartera): Cartera {
    const { totalCartera = '', totalInstrumentos = '', totalMonedas = '' } = response;
    const responseFormated: Cartera = {
      ...response,
      totalCartera: Number(totalCartera),
      totalInstrumentos: Number(totalInstrumentos),
      totalMonedas: Number(totalMonedas),
    }
    return responseFormated;
  }
  obtenerTipoNivelConocimiento() {
    //Con login y test se carga la variable o queda null si es que no hizo el perfil objetivo
    const resultadoObjetivoCartera=this.localStorageService.getItem('perfilObjetivoCartera') ;
    console.log("🚀 ~ file: cartera.component.ts:67 ~ CarteraComponent ~ obtenerTipoNivelConocimiento ~ resultadoObjetivoCartera:", resultadoObjetivoCartera)
    const perfilInversorLogeado = JSON.parse(localStorage.getItem('Perfil') || '').perfilInversor;
    const resultadoObjetivo = localStorage.getItem('perfilinversor');

    return resultadoObjetivo || perfilInversorLogeado || '';
  }
}
