import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarteraService } from 'src/app/core/services/api/cartera/cartera.service';
import { Cartera } from 'src/app/core/models/cartera/cartera';
import { DolarBolsa } from 'src/app/core/models/dolar-bolsa/dolar-bolsa';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/common/modal/modal.component';
import { ChartType } from 'chart.js';


@Component({
  selector: 'app-cartera',
  templateUrl: './cartera.component.html',
  styleUrls: ['./cartera.component.scss']
})
export class CarteraComponent implements OnInit {

  constructor(private carteraService: CarteraService, private router: Router,private modalService : NgbModal) { }
  tipoGrafico:ChartType='pie';
  totalValorizadoNulo: number = 20000;
  cartera: Cartera | undefined;
  valorActualDolarMEP: DolarBolsa | undefined;
  fechaCompletaDolarMEP:string='';

  ngOnInit(): void {
    this.getCartera();
    this.obtenerPrecioDolarMEP()
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
  direccionar(componente:string){
    this.router.navigate([`/dashboard/${componente}`]);
  }
  obtenerPrecioDolarMEP(){
    return this.carteraService.getPrecioDolarMEP().subscribe((response)=>{
    this.valorActualDolarMEP=response;
    // Convierte la cadena en un objeto Date
    const fecha = (new Date(this.valorActualDolarMEP.fechaActualizacion)).toLocaleString();
    this.fechaCompletaDolarMEP = fecha;
    })
  }
}
