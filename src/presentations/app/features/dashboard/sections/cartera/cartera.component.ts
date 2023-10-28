import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarteraService } from 'src/core/services/api/cartera/cartera.service';
import { Cartera } from 'src/core/models/cartera/cartera';
import { DolarBolsa } from 'src/core/models/dolar-bolsa/dolar-bolsa';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChartType } from 'chart.js';


@Component({
  selector: 'app-cartera',
  templateUrl: './cartera.component.html',
  styleUrls: ['./cartera.component.scss']
})
export class CarteraComponent implements OnInit {

  constructor(private carteraService: CarteraService, private router: Router, private modalService: NgbModal) { }
  datosGrafico : any;
  tipoGrafico: ChartType = 'pie';
  tipoGraficoLinea: ChartType = 'line';
  totalValorizadoNulo: number = 0;
  cartera: Cartera | undefined;
  valorActualDolarMEP: DolarBolsa | undefined;
  fechaCompletaDolarMEP: string = '';
  tituloGraficoTorta : string ="Total valorizado";
  tituloGraficoLinea : string ="Mi progreso";

  ngOnInit(): void {
    this.getCartera();
    this.obtenerPrecioDolarMEP()
    this.generarAleatorioTotalValorizado()
  }
  getCartera() {
    return this.carteraService.getCartera().subscribe((response) => {
      const { totalCartera = '', totalInstrumentos = '', totalMonedas = '' } = response;
      const responseFormated: Cartera = {
        ...response,
        totalCartera: Number((Math.round(Number(totalCartera) * 100) / 100).toFixed(2)),
        totalInstrumentos: Number((Math.round(Number(totalInstrumentos) * 100) / 100).toFixed(2)),
        totalMonedas: Number((Math.round(Number(totalMonedas) * 100) / 100).toFixed(2)),
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
