import { Component, Input, OnInit} from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { DatosGraficoVelas, DetalleInstrumento, SolapaDetalleInstrumento } from 'src/app/core/models/detalle-instrumento/detalle-instrumento';
import { DetalleInstrumentoService } from 'src/app/core/services/api/detalle-instrumento/detalle-instrumento.service';

@Component({
  selector: 'app-modal',
  styleUrls: ['./modal.component.scss'],
  templateUrl: './modal.component.html',
})
export class ModalComponent implements OnInit {

  instrumento:string='';
  detalleInstrumento!:DetalleInstrumento;
  solapaDetalleInstrumento: SolapaDetalleInstrumento |undefined;
  datosGraficoVelas : DatosGraficoVelas[]=[];

  constructor(public activeModal: NgbActiveModal,private detalleInstrumentoService : DetalleInstrumentoService) {}

  ngOnInit(): void {
    this.seleccionarInstrumento();
    
  }
  cerrarModal() {
    this.activeModal.close();
  }
  public seleccionarInstrumento() {
    if(this.detalleInstrumento){
      const simbolo=this.detalleInstrumento.simbolo;
      this.detalleInstrumentoService.getDetalleInstrumento(simbolo).subscribe((response) => {
        this.datosGraficoVelas=response;
        if (this.solapaDetalleInstrumento) {
          this.solapaDetalleInstrumento.detalleGraficoVelas = this.datosGraficoVelas;
          this.solapaDetalleInstrumento.detalleInstrumento = this.detalleInstrumento;
        }
    });
    }
  }
 
}
