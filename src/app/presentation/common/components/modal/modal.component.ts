import { Component, OnInit} from '@angular/core';
import { NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { DatosGraficoVelas, DetalleInstrumento, SolapaDetalleInstrumento } from '@core/models/detalle-instrumento/detalle-instrumento';
import { DetalleInstrumentoService } from '@core/services/api/detalle-instrumento/detalle-instrumento.service';


@Component({
  selector: 'app-modal',
  styleUrls: ['./modal.component.scss'],
  templateUrl: './modal.component.html',
})
export class ModalComponent implements OnInit {
  textMessage:string='';
  typeMessage:string='';
  instrumento:string='';
  detalleInstrumento!:DetalleInstrumento;
  solapaDetalleInstrumento!: SolapaDetalleInstrumento;
  datosGraficoVelas! : DatosGraficoVelas[];

  constructor(public activeModal: NgbActiveModal,private detalleInstrumentoService : DetalleInstrumentoService,private servicioModal: NgbModal) {}

  ngOnInit(): void {
    this.seleccionarInstrumento();
    this.mostrarVariacionDiaria();
  }
  cerrarModal() {
    this.activeModal.close();
    this.servicioModal.dismissAll();
  }
  public seleccionarInstrumento() {
    if(this.detalleInstrumento){
      const simbolo=this.detalleInstrumento.simbolo;
      this.detalleInstrumentoService.getDetalleInstrumento(simbolo).subscribe((response) => {
        this.datosGraficoVelas=response;
        this.solapaDetalleInstrumento = {
          detalleInstrumento: this.detalleInstrumento,
          datosGraficoVelas: this.datosGraficoVelas,
        };
    });
    }
  }
  mostrarVariacionDiaria() {
    if (this.detalleInstrumento.variacionPorcentual) {
      const variacion = this.detalleInstrumento.variacionPorcentual;
      const ultimoCierre = this.detalleInstrumento.ultimoCierre;
      const valorFinal = ((ultimoCierre * variacion) / 100).toFixed(2);
      const textoPorcentual = `(${variacion.toFixed(2)}%)`; 
      this.textMessage = '$'+valorFinal.toString().concat(textoPorcentual);
      if (this.detalleInstrumento.variacionPorcentual > 0)
        this.typeMessage = 'success';
      else
        this.typeMessage = 'error';
    }
  }
 
}
