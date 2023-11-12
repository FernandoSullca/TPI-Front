import { Component, OnInit } from '@angular/core';
import { HistoricoInstrumento, RendimientoTotalInstrumento } from 'src/app/core/models/rendimiento/rendimiento';
import { RendimientoService } from 'src/app/core/services/api/rendimiento/rendimiento.service';

@Component({
  selector: 'app-rendimiento',
  templateUrl: './rendimiento.component.html',
  styleUrls: ['./rendimiento.component.scss']
})
export class RendimientoComponent implements OnInit {
  public rendimientoInstrumento!: RendimientoTotalInstrumento[];
  public historico1!: HistoricoInstrumento[];
  public typeMessage: string = '';
  constructor (private rendimientoService : RendimientoService){}

  ngOnInit(): void {
    this.obtenerRendimientoTotal();
  }
  public parseoValorString(valor: number) {
    return valor.toString();
  }
  public validacionDeSigno(valor: number) {
    return valor > 0 ? 'success' : 'error'
  }
  obtenerHistoricoInstrumento(simbolo:string){
    this.historico1 = this.rendimientoService.obtenerHistoricoInstrumento(simbolo);
  }
  obtenerRendimientoTotal(){
    this.rendimientoInstrumento =this.rendimientoService.obtenerRendimientoTotal();
  }
}